import aiosqlite

DB_NAME = "project.db"

async def init_db():
    """Создает таблицу пользователей, если её еще нет"""
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id BIGINT UNIQUE,
                username TEXT,
                referred_by BIGINT DEFAULT NULL,
                has_purchased BOOLEAN DEFAULT 0
            )
        """)
        await db.commit()

async def check_and_add_user(user_id: int, username: str, ref_code: str = None) -> str:
    """
    Проверяет юзера в базе с защитой от вылета соединений.
    """
    status = "old"
    
    async with aiosqlite.connect(DB_NAME) as db:
        # Увеличиваем таймаут ожидания БД, чтобы не ловить database is locked
        await db.execute("PRAGMA busy_timeout = 5000")
        
        async with db.execute("SELECT user_id FROM users WHERE user_id = ?", (user_id,)) as cursor:
            user = await cursor.fetchone()
            
        if not user:
            # Если юзер новый, проверяем реф-код
            if ref_code and ref_code.isdigit() and int(ref_code) != user_id:
                inviter_id = int(ref_code)
                
                # Защита: проверяем, существует ли вообще тот, кто пригласил
                async with db.execute("SELECT user_id FROM users WHERE user_id = ?", (inviter_id,)) as ref_cursor:
                    inviter_exists = await ref_cursor.fetchone()
                
                if inviter_exists:
                    await db.execute(
                        "INSERT INTO users (user_id, username, referred_by) VALUES (?, ?, ?)",
                        (user_id, username, inviter_id)
                    )
                    status = "new_with_ref"
                else:
                    # Если реф-код фейковый или юзера удалили, регистрируем просто так
                    await db.execute(
                        "INSERT INTO users (user_id, username) VALUES (?, ?)",
                        (user_id, username)
                    )
                    status = "new_clean"
            else:
                # Новый юзер без реферала
                await db.execute(
                    "INSERT INTO users (user_id, username) VALUES (?, ?)",
                    (user_id, username)
                )
                status = "new_clean"
                
            await db.commit()
            
    return status

async def give_referral_bonus(user_id: int, amount: float):
    """
    Безопасное начисление бонуса.
    """
    inviter_id = None
    bonus_money = 0
    
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("PRAGMA busy_timeout = 5000")
        
        async with db.execute("SELECT referred_by, has_purchased FROM users WHERE user_id = ?", (user_id,)) as cursor:
            result = await cursor.fetchone()
            
        if result:
            referred_by, has_purchased = result
            
            if referred_by and not has_purchased:
                bonus_money = amount * 0.15
                inviter_id = referred_by
                
                # ТУТ ТВОЙ SQL ЗАПРОС НА НАЧИСЛЕНИЕ БАЛАНСА ПРИГЛАСИВШЕМУ, ЕСЛИ ОН ЕСТЬ
                # await db.execute("UPDATE users SET balance = balance + ? WHERE user_id = ?", (bonus_money, referred_by))
                
                await db.execute("UPDATE users SET has_purchased = 1 WHERE user_id = ?", (user_id,))
                await db.commit()
                print(f"💰 Бонус {bonus_money} успешно начислен пользователю {referred_by}!")
                
    return inviter_id, bonus_money

async def get_user_stats(user_id: int):
    """Возвращает количество рефералов и заработанный баланс"""
    async with aiosqlite.connect(DB_NAME) as db:
        await db.execute("PRAGMA busy_timeout = 5000")
        
        # Считаем, сколько человек указали этого юзера как пригласителя
        async with db.execute("SELECT COUNT(*) FROM users WHERE referred_by = ?", (user_id,)) as cursor:
            count_row = await cursor.fetchone()
            friends_count = count_row[0] if count_row else 0
            
        # Тут считаем баланс (если у тебя есть поле balance, если нет — пока ставим 0 или считаем по формуле)
        earned_money = friends_count * 1000 # Временная заглушка, подставь свою логику баланса
        
    return friends_count, earned_money