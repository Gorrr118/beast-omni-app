// Инициализация Telegram WebApp в самом начале
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
    const usernameElement = document.getElementById('web-app-username');

    // Подставляем имя юзера в верхнюю панель
    const user = tg?.initDataUnsafe?.user;
    if (user && usernameElement) {
        usernameElement.innerText = `Hello, ${user.first_name || user.username || 'filatow'}`;
    }

    // ================= БАЗА ПЕРЕВОДОВ =================
    const translations = {
        ru: {
            ref_title: "Строй свою медиа-империю!",
            ref_desc: "Приглашай друзей, копи Omni Coins и открывай эксклюзивный контент для своих роликов абсолютно бесплатно.",
            steps_title: "Как это работает?",
            step_1: "Копируй свою уникальную ссылку ниже и отправь её знакомым ютуберам, стримерам или опубликуй в соцсетях.",
            step_2: "Твой друг регистрируется в боте и мгновенно получает 50 коинов и +5 дней Premium на тест перевода видео.",
            step_3: "Тебе зачисляется 100 коинов за каждого, а также 15% пожизненно с каждой их покупки пакетов реальных денег!",
            your_bonus: "ТВОЙ БОНУС",
            your_bonus_val: "100 Coins + 15%",
            friend_bonus: "БОНУС ДРУГУ",
            friend_bonus_val: "50 Coins + 5 Дней",
            link_label: "ВАША РЕФЕРАЛЬНАЯ ССЫЛКА",
            copy: "Копировать",
            copied: "Скопировано!",
            invited: "Приглашено:",
            earned: "Заработано:"
        },
        en: {
            ref_title: "Build your media empire!",
            ref_desc: "Invite friends, stack Omni Coins, and unlock exclusive content for your videos absolutely for free.",
            steps_title: "How does it work?",
            step_1: "Copy your unique link below and send it to fellow YouTubers, streamers, or share it on social media.",
            step_2: "Your friend signs up and instantly gets 50 coins and +5 days of Premium to test video translation.",
            step_3: "You get 100 coins for each referral, plus 15% lifetime commission from their real money pack purchases!",
            your_bonus: "YOUR BONUS",
            your_bonus_val: "100 Coins + 15%",
            friend_bonus: "FRIEND'S BONUS",
            friend_bonus_val: "50 Coins + 5 Days",
            link_label: "YOUR REFERRAL LINK",
            copy: "Copy",
            copied: "Copied!",
            invited: "Invited:",
            earned: "Earned:"
        }
    };

    // Проверяем сохраненный язык или язык самого Телеграма
    let currentLang = localStorage.getItem('app_lang') || (tg?.initDataUnsafe?.user?.language_code === 'en' ? 'en' : 'ru');

    // Функция перевода элементов
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
        langBtn.removeAttribute('onclick'); // На всякий случай чистим старые инлайн события
        langBtn.addEventListener('click', () => {
            tg.showPopup({
                title: 'Смена языка / Change Language',
                message: 'Выберите язык интерфейса BEAST OMNI:',
                buttons: [
                    { id: 'en', type: 'default', text: '🇺🇸 English (US)' },
                    { id: 'ru', type: 'default', text: '🇷🇺 Русский (RU)' },
                    { id: 'cancel', type: 'cancel', text: 'Отмена' }
                ]
            }, (buttonId) => {
                if (buttonId === 'en' || buttonId === 'ru') {
                    currentLang = buttonId;
                    applyTranslations();
                }
            });
        });
    }

    // Принудительно переводим при старте
    applyTranslations();

    // Генерация рефералки по Telegram ID
    if (refInput) {
        if (user?.id) {
            refInput.value = `https://t.me/your_beast_omni_bot?start=${user.id}`; 
        } else {
            refInput.value = `https://t.me/your_beast_omni_bot?start=test_id`; // Фикс для тестов в браузере
        }
    }

    // ================= ЛОГИКА КНОПКИ КОПИРОВАНИЯ И АНИМАЦИИ =================
    if (copyButton && refInput) {
        copyButton.addEventListener('click', () => {
            refInput.select();
            refInput.setSelectionRange(0, 99999); // Для мобилок

            const textToCopy = refInput.value;
            const lang = translations[currentLang];

            // Современный асинхронный буфер с фоллбэком
            const proceedAnimation = () => {
                copyButton.innerText = lang.copied;
                copyButton.classList.add('copied');
                copyButton.style.background = '#22c55e'; // Сочный зеленый неон при успехе
                copyButton.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';

                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.innerText = lang.copy;
                    copyButton.style.background = 'linear-gradient(45deg, #38bdf8, #3b82f6)'; // Возвращаем синий неон
                    copyButton.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(proceedAnimation).catch(() => {
                    // Если заблочено политикой безопасности мобилки, юзаем старый метод
                    document.execCommand('copy');
                    proceedAnimation();
                });
            } else {
                document.execCommand('copy');
                proceedAnimation();
            }
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
            refPage.style.display = 'block';
        }
    }
    clearInboundBugs();
});

// ================= ФИКС БАГА МИГАНИЯ (ПРЕЛОАДЕР) =================
// Ждем полной загрузки CSS, картинок и шрифтов, затем плавно тушим прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.25s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 250);
        }, 50); // Микропауза для идеального рендеринга стилей
    }
});
