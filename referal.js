const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const langBtn = document.getElementById('lang-switch-btn');
    const usernameDisplay = document.getElementById('username-display');
    
    const langFlag = langBtn?.querySelector('.flag');
    const langText = langBtn?.querySelector('.lang-text');

    const user = tg?.initDataUnsafe?.user;

    if (user?.username) {
        usernameDisplay.innerText = user.username;
    } else if (user?.first_name) {
        usernameDisplay.innerText = user.first_name;
    }

    // Реферальная ссылка с ID пользователя (замени your_bot на юзернейм своего бота)
    let userRefUrl = `https://t.me/your_bot?start=test_id`;
    if (user?.id) {
        userRefUrl = `https://t.me/your_bot?start=ref_${user.id}`; 
    }

    // Словари перевода (основной язык по умолчанию — английский 'en')
    const translations = {
        en: {
            badge_text: "PARTNER NETWORK 2.0",
            ref_title: "Build your media empire!",
            ref_desc: "Invite friends, stack Omni Coins, and unlock exclusive content for your videos absolutely for free.",
            steps_title: "PROTOCOL WORKFLOW",
            step_1: "Tap the button below — the ready text with your link will be instantly copied.",
            step_2: "Your friend launches the bot via your link and gets 50 coins & +7 days of Premium.",
            step_3: "You get 150 coins + an exclusive avatar for their first purchase, plus a lifetime %!",
            your_bonus: "YOUR REWARD",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "FRIEND START",
            friend_bonus_val: "50 Coins + 7 Days",
            copy_btn_text: "COPY INVITATION PAYLOAD",
            copied: "SUCCESSFULLY COPIED!",
            hint_sub: "One-tap copy for Telegram chats & creator communities",
            invited: "NODES LINKED",
            earned: "TOTAL MINED"
        },
        ru: {
            badge_text: "ПАРТНЕРСКАЯ ПРОГРАММА 2.0",
            ref_title: "Строй свою медиа-империю!",
            ref_desc: "Приглашай друзей, копи Omni Coins и открывай эксклюзивный контент для своих роликов абсолютно бесплатно.",
            steps_title: "КАК ЭТО РАБОТАЕТ?",
            step_1: "Жми на кнопку ниже — готовый текст со ссылкой мгновенно копируется в буфер обмена.",
            step_2: "Друг запускает бота по ссылке и получает 50 коинов и +7 дней Premium.",
            step_3: "Тебе падает 150 коинов + эксклюзивный аватар за его первую покупку и % пожизненно!",
            your_bonus: "ТВОЙ БОНУС",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "БОНУС ДРУГУ",
            friend_bonus_val: "50 Coins + 7 Days",
            copy_btn_text: "СКОПИРОВАТЬ ПРИГЛАШЕНИЕ",
            copied: "УСПЕШНО СКОПИРОВАНО!",
            hint_sub: "Нажми и сразу отправляй готовый текст другу в Telegram",
            invited: "ПРИГЛАШЕНО",
            earned: "ЗАРАБОТАНО"
        }
    };

    // Устанавливаем английский ('en') по умолчанию
    let currentLang = localStorage.getItem('app_lang') || 'en';

    function applyTranslations() {
        const lang = translations[currentLang];
        if (!lang) return;
        
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (lang[key]) {
                element.innerText = lang[key];
            }
        });

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

    // Кнопка смены языка через Telegram Popup
    if (langBtn && tg) {
        langBtn.addEventListener('click', () => {
            tg.showPopup({
                title: currentLang === 'ru' ? 'Смена языка' : 'Language / Язык',
                message: currentLang === 'ru' ? 'Выберите язык интерфейса:' : 'Select interface language:',
                buttons: [
                    { id: 'en', type: 'default', text: '🇺🇸 English (US)' },
                    { id: 'ru', type: 'default', text: '🇷🇺 Русский (RU)' },
                    { id: 'cancel', type: 'cancel', text: 'Отмена / Cancel' }
                ]
            }, (buttonId) => {
                if (buttonId === 'en' || buttonId === 'ru') {
                    currentLang = buttonId;
                    applyTranslations();
                }
            });
        });
    }

    applyTranslations();

    // Логика копирования реферального текста
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            let textToCopy = "";
            if (currentLang === 'ru') {
                textToCopy = `🚀 Здарова! Тестирую крутого AI-бота BEAST OMNI. Забирай 50 коинов и 7 дней Премиума по моей ссылке: ${userRefUrl} 🔥`;
            } else {
                textToCopy = `🚀 Hey! Testing BEAST OMNI bot. Grab 50 free coins & 7 days of Premium using my link: ${userRefUrl} 🔥`;
            }

            const lang = translations[currentLang];

            const proceedAnimation = () => {
                copyButton.querySelector('.btn-content').innerHTML = `<span>${lang.copied}</span>`;
                setTimeout(() => {
                    copyButton.querySelector('.btn-content').innerHTML = `<span>${lang.copy_btn_text}</span>`;
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(proceedAnimation).catch(() => {
                    fallbackCopyText(textToCopy, proceedAnimation);
                });
            } else {
                fallbackCopyText(textToCopy, proceedAnimation);
            }
        });
    }
});

function fallbackCopyText(text, callback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        callback();
    } catch (err) {
        console.error('Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
