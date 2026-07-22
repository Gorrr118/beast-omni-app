// Инициализация Telegram WebApp в самом начале (один раз!)
const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand(); // Раскрываем на весь экран
}

document.addEventListener('DOMContentLoaded', () => {
    // Элементы страницы
    const copyButton = document.getElementById('copy-button');
    const refInput = document.getElementById('ref-url');
    const langBtn = document.getElementById('lang-switch-btn'); 
    
    const langFlag = langBtn?.querySelector('.flag');
    const langText = langBtn?.querySelector('.lang-text');

    const user = tg?.initDataUnsafe?.user;

    // ================= БАЗА ПЕРЕВОДОВ =================
    const translations = {
        ru: {
            ref_title: "Строй свою медиа-империю!",
            ref_desc: "Приглашай создателей контента, забирай эпические награды и прокачивай свои видео без ограничений.",
            steps_title: "Как это работает?",
            step_1: "Копируй персональную ссылку и делись ею с ютуберами, стримерами или в Telegram-каналах.",
            step_2: "Друг запускает бота и мгновенно забирает 50 коинов + 7 дней Premium на тест перевода.",
            step_3: "Когда друг делает первую покупку, ты получаешь 150 Coins + пожизненный эксклюзивный аватар и % от пополнений!",
            your_bonus: "ТВОЙ БОНУС ЗА ПОКУПКУ ДРУГА",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "БОНУС ДРУГУ СТАРТ",
            friend_bonus_val: "50 Coins + 7 Days",
            link_label: "Твоя реферальная ссылка",
            copy: "Copy",
            copied: "Скопировано!",
            invited: "Приглашено:",
            earned: "Заработано:",
            balance_prefix: "Баланс: "
        },
        en: {
            ref_title: "Build your media empire!",
            ref_desc: "Invite content creators, claim epic rewards, and upgrade your videos without limits.",
            steps_title: "How does it work?",
            step_1: "Copy your personal link and share it with YouTubers, streamers, or in Telegram channels.",
            step_2: "Your friend launches the bot and instantly claims 50 coins + 7 days of Premium to test translation.",
            step_3: "When your friend makes their first purchase, you get 150 Coins + a lifetime exclusive avatar and a % of top-ups!",
            your_bonus: "YOUR BONUS FOR FRIEND'S PURCHASE",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "FRIEND START BONUS",
            friend_bonus_val: "50 Coins + 7 Days",
            link_label: "Your referral link",
            copy: "Copy",
            copied: "Copied!",
            invited: "Invited:",
            earned: "Earned:",
            balance_prefix: "Balance: "
        }
    };

    // Принудительно ставим английский по умолчанию, либо берем сохраненный с главного экрана
    let currentLang = localStorage.getItem('app_lang') || 'en';

    // Функция перевода элементов и обновления баланса
    function applyTranslations() {
        const lang = translations[currentLang];
        if (!lang) return;
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (lang[key]) {
                // Если сейчас горит статус копирования, не сбрасываем текст раньше времени
                if (element.id === 'copy-button' && element.classList.contains('copied')) {
                    return; 
                }
                element.innerText = lang[key];
            }
        });

        // ДИНАМИЧЕСКИ ОБНОВЛЯЕМ ТЕКСТ БАЛАНСА В ШАПКЕ РЕФЕРАЛКИ
        const balanceTextNode = document.querySelector('.balance-text');
        const coinsVal = typeof getBalance === 'function' ? getBalance() : 0;

        if (balanceTextNode) {
            balanceTextNode.innerHTML = `${lang.balance_prefix}<strong id="user-coins">${coinsVal}</strong> Omni Coins`;
        }

        // Меняем флаг и текст в верхней плашке
        if (langFlag && langText) {
            if (currentLang === 'ru') {
                langFlag.innerText = '🇷🇺';
                langText.innerText = 'RU';
            } else {
                langFlag.innerText = '🇺🇸';
                langText.innerText = 'US';
            }
        }

        localStorage.setItem('app_lang', currentLang);
    }

    // ================= НАДЛАДОЧНАЯ НАВЕРХ СМЕНА ЯЗЫКА (TELEGRAM POPUP) =================
    if (langBtn && tg) {
        langBtn.removeAttribute('onclick'); 
        langBtn.addEventListener('click', () => {
            tg.showPopup({
                title: currentLang === 'ru' ? 'Смена языка' : 'Language / Язык',
                message: currentLang === 'ru' ? 'Выберите язык интерфейса BEAST OMNI:' : 'Select interface language for BEAST OMNI:',
                buttons: [
                    { id: 'en', type: 'default', text: '🇺🇸 English (US)' },
                    { id: 'ru', type: 'default', text: '🇷🇺 Русский (RU)' },
                    { id: 'cancel', type: 'cancel', text: 'Отмена / Cancel' }
                ]
            }, (buttonId) => {
                if (buttonId === 'en' || buttonId === 'ru') {
                    currentLang = buttonId;
                    applyTranslations();
                    
                    if (typeof updateBalanceUI === 'function') {
                        updateBalanceUI(getBalance());
                    }
                }
            });
        });
    }

    // Обновляем циферблат коинов из памяти при загрузке
    if (typeof getBalance === 'function') {
        const currentCoins = getBalance();
        const refCoinEl = document.getElementById('user-coins');
        if (refCoinEl) refCoinEl.innerText = currentCoins;
    }

    // Принудительно переводим при старте
    applyTranslations();

    // Генерация рефералки по Telegram ID
    let userRefUrl = `https://t.me/your_beast_omni_bot?start=test_id`;
    if (user?.id) {
        userRefUrl = `https://t.me/your_beast_omni_bot?start=ref_${user.id}`; 
    }

    if (refInput) {
        refInput.value = userRefUrl;
    }

    // Динамически обновляем ссылку и в готовом тексте для друга
    const promoMessageText = document.getElementById('promo-message-text');
    if (promoMessageText) {
        if (currentLang === 'ru') {
            promoMessageText.innerHTML = `🚀 Здарова! Я тут тестирую крутого AI-бота для перевода и озвучки видео <b>BEAST OMNI</b>. Переводит голосом один в один, делает крутые аватары и виджеты. Переходи по ссылке, забирай <b>50 халявных коинов и 7 дней Премиума</b> на тест: ${userRefUrl} 🔥`;
        } else {
            promoMessageText.innerHTML = `🚀 Hey! I'm testing an awesome AI video translation & voiceover bot called <b>BEAST OMNI</b>. It does voice cloning, cool avatars, and widgets. Use my link to grab <b>50 free coins & 7 days of Premium</b>: ${userRefUrl} 🔥`;
        }
    }

    // ================= ЛОГИКА КНОПКИ КОПИРОВАНИЯ ССЫЛКИ И АНИМАЦИИ =================
    if (copyButton && refInput) {
        copyButton.addEventListener('click', () => {
            refInput.select();
            refInput.setSelectionRange(0, 99999); // Для мобилок

            const textToCopy = refInput.value;
            const lang = translations[currentLang];

            const proceedAnimation = () => {
                copyButton.innerHTML = `<i class="fa-solid fa-check"></i> ${lang.copied}`;
                copyButton.classList.add('copied');
                copyButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)'; // Сочный зеленый неон
                copyButton.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.6)';

                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.innerHTML = `<i class="fa-regular fa-copy"></i> ${lang.copy}`;
                    copyButton.style.background = 'linear-gradient(135deg, #00F0FF 0%, #0072FF 100%)'; // Возвращаем синий неон
                    copyButton.style.boxShadow = '0 2px 10px rgba(0, 240, 255, 0.3)';
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(proceedAnimation).catch(() => {
                    document.execCommand('copy');
                    proceedAnimation();
                });
            } else {
                document.execCommand('copy');
                proceedAnimation();
            }
        });
    }

    // ================= ЛОГИКА КОПИРОВАНИЯ ГОТОВОГО ПРОМО-ТЕКСТА =================
    const copyPromoBtn = document.getElementById("copy-promo-text");

    if (copyPromoBtn && promoMessageText) {
        copyPromoBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(promoMessageText.innerText);
            
            const originalText = copyPromoBtn.innerText;
            copyPromoBtn.innerText = currentLang === 'ru' ? "Скопировано!" : "Copied!";
            copyPromoBtn.style.color = "#10B981";

            setTimeout(() => {
                copyPromoBtn.innerText = originalText;
                copyPromoBtn.style.color = "#a855f7";
            }, 2000);
        });
    }

    // ================= Скрываем мусор других страниц (SPA Фикс) =================
    function clearInboundBugs() {
        const studioPage = document.getElementById('studio-page') || document.querySelector('.studio-container');
        const mainPage = document.getElementById('main-page') || document.querySelector('.main-container');
        
        if (studioPage) studioPage.style.display = 'none';
        if (mainPage) mainPage.style.display = 'none';
        
        const refPage = document.getElementById('referral-page') || document.querySelector('.main-content');
        if (refPage) {
            refPage.style.display = 'flex';
        }
    }
    clearInboundBugs();
});

// ================= ФИКС БАГА МИГАНИЯ (ПРЕЛОАДЕР) =================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.25s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 250);
        }, 50); 
    }
});
