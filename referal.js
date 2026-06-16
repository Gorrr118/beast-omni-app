document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const copyButton = document.getElementById('copy-button');
    const refInput = document.getElementById('ref-url');
    
    // Объект с переводами
    const translations = {
        ru: {
            back: "⬅ Назад",
            title: "Приглашай друзей — зарабатывай 15%!",
            desc: "Поделись своей уникальной ссылкой с другими стримерами или ютуберами. Получай проценты с каждой их первой покупки прямо на баланс!",
            your_bonus: "Твой Бонус",
            your_bonus_val: "15% от оплаты",
            friend_bonus: "Бонус Другу",
            friend_bonus_val: "+5 дней Premium",
            link_label: "ВАША РЕФЕРАЛЬНАЯ ССЫЛКА",
            copy: "Копировать",
            copied: "Скопировано!",
            invited: "Приглашено: ",
            earned: "Заработано: "
        },
        en: {
            back: "⬅ Back",
            title: "Invite friends — earn 15%!",
            desc: "Share your unique link with other streamers or YouTubers. Get a percentage of their first purchase directly to your balance!",
            your_bonus: "Your Bonus",
            your_bonus_val: "15% of payment",
            friend_bonus: "Friend's Bonus",
            friend_bonus_val: "+5 days Premium",
            link_label: "YOUR REFERRAL LINK",
            copy: "Copy",
            copied: "Copied!",
            invited: "Invited: ",
            earned: "Earned: "
        }
    };

    // Определяем язык юзера (по умолчанию ru, если у него en — включаем английский)
    const userLang = tg.initDataUnsafe?.user?.language_code === 'en' ? 'en' : 'ru';
    const lang = translations[userLang];

    // Функция перевода элементов на странице
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (lang[key]) {
            // Если это кнопка копирования, меняем только текст, не трогая логику
            if (element.id === 'copy-button') {
                element.innerText = lang[key];
            } else if (element.tagName === 'SPAN' && (key === 'invited' || key === 'earned')) {
                element.innerText = lang[key];
            } else {
                element.innerText = lang[key];
            }
        }
    });

    // Получаем реальный ID и подставляем в инпут
    const user = tg.initDataUnsafe?.user;
    if (user) {
        // Замени 'your_stream_bot' на реальный юзернейм твоего бота без собаки
        refInput.value = `https://t.me/your_stream_bot?start=${user.id}`; 
    }

    // Логика кнопки "Копировать" с учетом языка
    copyButton.addEventListener('click', () => {
        refInput.select();
        refInput.setSelectionRange(0, 99999);

        try {
            navigator.clipboard.writeText(refInput.value);
        } catch (err) {
            document.execCommand('copy');
        }

        // Анимация кнопки на нужном языке
        copyButton.innerText = lang.copied;
        copyButton.style.background = '#4ebd4e';
        copyButton.style.color = '#ffffff';

        setTimeout(() => {
            copyButton.innerText = lang.copy;
            copyButton.style.background = 'linear-gradient(45deg, #00f2fe, #4facfe)';
            copyButton.style.color = '#0d0f14';
        }, 2000);
    });
});