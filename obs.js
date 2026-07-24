const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('characters-container');
    const user = tg?.initDataUnsafe?.user;
    const usernameDisplay = document.getElementById('username-display');

    if (user?.username) {
        usernameDisplay.innerText = user.username;
    } else if (user?.first_name) {
        usernameDisplay.innerText = user.first_name;
    }

    // Генерация 30 персонажей в сетку
    const avatarsEmojis = ['🤖', '🦊', '🐱', '💀', '👩‍🎤', '🧙‍♂️', '🥷', '🦸‍♂️', '🦁', '👽', 
                           '🧑‍💻', '⚡', '🐉', '👾', '🧛‍♂️', '🧜‍♀️', '🧞‍♂️', '🤖', '🐯', '🐼',
                           '🦄', '👺', '👻', '🤖', '🦁', '🦊', '🐱', '💀', '👩‍🎤', '👑'];

    for (let i = 1; i <= 30; i++) {
        const slot = document.createElement('div');
        slot.className = 'char-slot';
        
        // Первые 10 доступны в Starter, до 20 в Pro, до 30 в Beast
        let isLocked = i > 10; 
        let lockHtml = isLocked ? `<i class="fa-solid fa-lock lock-icon"></i>` : ``;

        slot.innerHTML = `
            <div class="char-avatar-preview">${avatarsEmojis[i-1] || '🤖'}</div>
            <span class="char-name">Unit #${i < 10 ? '0' + i : i}</span>
            ${lockHtml}
        `;

        slot.addEventListener('click', () => {
            if (isLocked) {
                tg?.HapticFeedback?.notificationOccurred('error');
                alert(`Персонаж #${i} заблокирован! Повысьте свой пакет до Pro ($50) или Beast ($100), чтобы разблокировать всех 30 персонажей с живой анимацией рта.`);
            } else {
                tg?.HapticFeedback?.impactOccurred('medium');
                alert(`Выбран персонаж Unit #${i}. Синхронизация рта и анимация активны!`);
            }
        });

        container.appendChild(slot);
    }
});

function unlockTier(price, tierLevel) {
    if (tg && tg.openInvoice) {
        // Здесь будет вызов инвойса на оплату пакета через Telegram Stars / Crypto / Payment Provider
        tg.showAlert(`Инициирован запрос на покупку пакета Tier ${tierLevel} за $${price}. Подключение к шлюзу оплаты...`);
    } else {
        alert(`Покупка пакета Tier ${tierLevel} ($${price}). В Telegram WebApp оплата откроется автоматически.`);
    }
}
