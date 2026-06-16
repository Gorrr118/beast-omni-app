document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const copyButton = document.getElementById('copy-button');
    const refInput = document.getElementById('ref-url');
    const langBtn = document.getElementById('lang-switch-btn'); // Твоя кнопка перевода из шапки

    const translations = {
        ru: {
            ref_title: "Приглашай друзей — зарабатывай 15%!",
            ref_desc: "Поделись своей уникальной ссылкой с другими стримерами. Получай проценты с каждой их первой покупки!",
            your_bonus: "Твой Бонус",
            your_bonus_val: "15% от оплаты",
            friend_bonus: "Бонус Другу",
            friend_bonus_val: "+5 дней Premium",
            link_label: "ВАША РЕФЕРАЛЬНАЯ ССЫЛКА",
            copy: "Копировать",
            copied: "Скопировано!",
            invited: "Приглашено:",
            earned: "Заработано:"
        },
        en: {
            ref_title: "Invite friends — earn 15%!",
            ref_desc: "Share your unique link with other streamers. Get a percentage of their first purchase!",
            your_bonus: "Your Bonus",
            your_bonus_val: "15% of payment",
            friend_bonus: "Friend's Bonus",
            friend_bonus_val: "+5 days Premium",
            link_label: "YOUR REFERRAL LINK",
            copy: "Copy",
            copied: "Copied!",
            invited: "Invited:",
            earned: "Earned:"
        }
    };

    // Проверяем, какой язык был сохранен в системе, или берем язык ТГ
    let currentLang = localStorage.getItem('app_lang') || (tg.initDataUnsafe?.user?.language_code === 'en' ? 'en' : 'ru');

    function applyTranslations() {
        const lang = translations[currentLang];
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (lang[key]) {
                if (element.id === 'copy-button' && element.innerText === translations[currentLang === 'ru' ? 'en' : 'ru'].copied) {
                    return; // Если сейчас горит "Скопировано", не сбрасываем текст
                }
                element.innerText = lang[key];
            }
        });
        localStorage.setItem('app_lang', currentLang);
    }

    // Слушаем кнопку смены языка из шапки
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            applyTranslations();
        });
    }

    // Первичный перевод при загрузке страницы
    applyTranslations();

    // Генерация ссылки по ID
    const user = tg.initDataUnsafe?.user;
    if (user) {
        refInput.value = `https://t.me/your_stream_bot?start=${user.id}`; 
    }

    // Кнопка копирования
    copyButton.addEventListener('click', () => {
        refInput.select();
        refInput.setSelectionRange(0, 99999);
        try {
            navigator.clipboard.writeText(refInput.value);
        } catch (err) {
            document.execCommand('copy');
        }

        const lang = translations[currentLang];
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
