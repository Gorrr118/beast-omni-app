const translations = {
    en: {
        greeting: "Hello, filatow",
        homeTitle: "BEAST OMNI",
        homeDesc: "An innovative ecosystem of interactive widgets for streamers and creators...",
        tariffsHeader: "Available Tariffs",
        navHome: "Home",
        navReferral: "Referral",
        navStudio: "Studio",
        navWidgets: "Widgets",
        navShop: "Tegs" // или Shop
    },
    ru: {
        greeting: "Привет, filatow",
        homeTitle: "BEAST OMNI",
        homeDesc: "Инновационная экосистема интерактивных виджетов для стримеров и креаторов...",
        tariffsHeader: "Доступные тарифы",
        navHome: "Главная",
        navReferral: "Рефералы",
        navStudio: "Студия",
        navWidgets: "Виджеты",
        navShop: "Теги"
    }
};

// Функция смены языка, которая применяется на любой странице
function changeLanguage(lang) {
    // Сохраняем выбор пользователя в памяти браузера
    localStorage.setItem('selectedLang', lang);

    // Находим все элементы с атрибутом data-i18n и меняем текст
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Синхронизируем селект в шапке, если он есть на странице
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.value = lang;
    }
}

// Автоматический запуск при загрузке любой страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en'; // По умолчанию английский
    changeLanguage(savedLang);

    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
const translations = {
    en: {
        greeting: "Hello, filatow",
        uploadPlaceholder: "CLICK TO UPLOAD VIDEO",
        uploadInfo: "Supported MP4, MOV up to 50 MB",
        renderLoading: "Uploading video to server...",
        trackVideoEmpty: "Video track is empty",
        trackAudioOriginal: "Background Audio (Original)",
        trackAiDub: "AI Dubbing + Avatar",
        panelFormatHeader: "Frame Format",
        fmtYoutube: "16:9 YouTube",
        fmtShorts: "9:16 Shorts / TikTok",
        fmtSquare: "1:1 Square",
        panelTextHeader: "Text & Subtitles",
        smartSubtitles: "Enable 'smart' subtitles",
        btnFonts: "Fonts",
        btnVoices: "AI Voices",
        btnAvatars: "AI Avatars",
        panelAudioHeader: "Studio Audio Mixer",
        origMusicVol: "Original Sound (Background)",
        aiVoiceVol: "AI Dubbing Volume",
        panelExportHeader: "Media File Processing",
        exportInfoText: "AI will automatically generate translation, apply effects, timings, and render the video.",
        renderBtnText: "START VIDEO PROCESSING",
        toolFormat: "Format",
        toolCustom: "Custom",
        toolSound: "Sound",
        toolExport: "Export",
        navHome: "Home",
        navReferral: "Referral",
        navStudio: "Studio",
        navObs: "obs Settings",
        navTegs: "Tegs",
        inventoryTitle: "Your Inventory"
    },
    ru: {
        greeting: "Привет, filatow",
        uploadPlaceholder: "КЛИКНИ, ЧТОБЫ ЗАГРУЗИТЬ ВИДЕО",
        uploadInfo: "Поддерживается MP4, MOV до 50 МБ",
        renderLoading: "Загрузка видео на сервер...",
        trackVideoEmpty: "Видеодорожка пуста",
        trackAudioOriginal: "Фоновое аудио (Оригинал)",
        trackAiDub: "Дубляж ИИ + Аватар",
        panelFormatHeader: "Формат кадра",
        fmtYoutube: "16:9 YouTube",
        fmtShorts: "9:16 Shorts / TikTok",
        fmtSquare: "1:1 Квадрат",
        panelTextHeader: "Текст и Субтитры",
        smartSubtitles: "Включить «умные» субтитры",
        btnFonts: "Шрифты",
        btnVoices: "ИИ Голоса",
        btnAvatars: "ИИ Аватары",
        panelAudioHeader: "Аудиомикшер студии",
        origMusicVol: "Оригинальный звук (Фон)",
        aiVoiceVol: "Громкость ИИ дубляжа",
        panelExportHeader: "Обработка медиафайла",
        exportInfoText: "ИИ автоматически сгенерирует перевод, наложит эффекты, тайминги и отрендерит ролик.",
        renderBtnText: "НАЧАТЬ ОБРАБОТКУ РОЛИКА",
        toolFormat: "Формат",
        toolCustom: "Кастом",
        toolSound: "Звук",
        toolExport: "Экспорт",
        navHome: "Home",
        navReferral: "Referral",
        navStudio: "Studio",
        navObs: "obs Settings",
        navTegs: "Tegs",
        inventoryTitle: "Ваш инвентарь"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('selectedLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.value = lang;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    changeLanguage(savedLang);

    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
        dropdown.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
