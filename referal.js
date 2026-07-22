const tg = window.Telegram?.WebApp;
if (tg) {
    tg.ready();
    tg.expand();
}

document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const btnTextMain = document.getElementById('btn-text-main');
    const langBtn = document.getElementById('lang-switch-btn'); 
    
    const langFlag = langBtn?.querySelector('.flag');
    const langText = langBtn?.querySelector('.lang-text');

    const user = tg?.initDataUnsafe?.user;

    // Генерируем чистую реферальную ссылку
    let userRefUrl = `https://t.me/your_bot?start=test_id`;
    if (user?.id) {
        userRefUrl = `https://t.me/your_bot?start=ref_${user.id}`; 
    }

    const translations = {
        ru: {
            badge_text: "ПАРТНЕРСКАЯ ПРОГРАММА 2.0",
            ref_title: "Строй свою медиа-империю!",
            ref_desc: "Приглашай друзей, копи Omni Coins и открывай эксклюзивный контент для своих роликов абсолютно бесплатно.",
            steps_title: "Как это работает?",
            step_1: "Жми на кнопку ниже — готовый текст со ссылкой сразу скопируется в буфер обмена.",
            step_2: "Твой друг запускает бота по ссылке и мгновенно получает 50 коинов и +7 дней Premium.",
            step_3: "Тебе падает 150 коинов + эксклюзивный аватар за его первую покупку и % пожизненно!",
            your_bonus: "ТВОЙ БОНУС",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "БОНУС ДРУГУ",
            friend_bonus_val: "50 Coins + 7 Days",
            copy_btn_text: "Скопировать приглашение с ссылкой",
            copied: "Успешно скопировано в буфер!",
            hint_sub: "Нажми, чтобы скопировать текст и сразу отправить другу в Telegram",
            invited: "Приглашено:",
            earned: "Заработано:"
        },
        en: {
            badge_text: "PARTNER PROGRAM 2.0",
            ref_title: "Build your media empire!",
            ref_desc: "Invite friends, stack Omni Coins, and unlock exclusive content for your videos absolutely for free.",
            steps_title: "How does it work?",
            step_1: "Tap the button below — the ready text with your link will be instantly copied.",
            step_2: "Your friend launches the bot via your link and instantly gets 50 coins & +7 days of Premium.",
            step_3: "You get 150 coins + an exclusive avatar for their first purchase, plus a lifetime %!",
            your_bonus: "YOUR BONUS",
            your_bonus_val: "150 Coins + Avatar",
            friend_bonus: "FRIEND BONUS",
            friend_bonus_val: "50 Coins + 7 Days",
            copy_btn_text: "Copy Invitation with Link",
            copied: "Successfully Copied!",
            hint_sub: "Tap to copy the text and send it directly to your friend in Telegram",
            invited: "Invited:",
            earned: "Earned:"
        }
    };

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

    if (langBtn && tg) {
        langBtn.addEventListener('click', () => {
            tg.showPopup({
                title: currentLang === 'ru' ? 'Смена языка' : 'Language / Язык',
                message: currentLang === 'ru' ? 'Выберите язык интерфейса BEAST OMNI:' : 'Select interface language:',
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

    // Сборка готового рекламного текста прямо в коде кнопки
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            let textToCopy = "";
            if (currentLang === 'ru') {
                textToCopy = `🚀 Здарова! Я тут тестирую крутого AI-бота для перевода и озвучки видео BEAST OMNI. Переводит голосом один в один, делает аватары и виджеты. Забирай 50 халявных коинов и 7 дней Премиума по моей ссылке: ${userRefUrl} 🔥`;
            } else {
                textToCopy = `🚀 Hey! I'm testing an awesome AI video translation & voiceover bot called BEAST OMNI. It does voice cloning, cool avatars, and widgets. Grab 50 free coins & 7 days of Premium using my link: ${userRefUrl} 🔥`;
            }

            const lang = translations[currentLang];

            const proceedAnimation = () => {
                copyButton.innerHTML = `<i class="fa-solid fa-check"></i> ${lang.copied}`;
                copyButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                copyButton.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';

                setTimeout(() => {
                    copyButton.innerHTML = `<i class="fa-regular fa-copy"></i> <span id="btn-text-main">${lang.copy_btn_text}</span>`;
                    copyButton.style.background = 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)';
                    copyButton.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.45)';
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

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.3s ease';
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 300);
        }, 100); 
    }
});
