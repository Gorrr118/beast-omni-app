const translations = {
    en: {
        // Общие / Навбар / Хедер
        greeting: "Hello, filatow",
        navHome: "Home",
        navReferral: "Referral",
        navStudio: "Studio",
        navWidgets: "Widgets",
        navShop: "Tegs",
        navObs: "obs Settings",

        // Главная страница (index.html)
        homeTitle: "BEAST OMNI",
        homeDesc: "An innovative ecosystem of interactive widgets for streamers and creators...",
        tariffsHeader: "Available Tariffs",

        // Страница студии (studio.html)
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
        inventoryTitle: "Your Inventory"
    },
    ru: {
        // Общие / Навбар / Хедер
        greeting: "Привет, filatow",
        navHome: "Главная",
        navReferral: "Рефералы",
        navStudio: "Студия",
        navWidgets: "Виджеты",
        navShop: "Теги",
        navObs: "obs Settings",

        // Главная страница (index.html)
        homeTitle: "BEAST OMNI",
        homeDesc: "Инновационная экосистема интерактивных виджетов для стримеров и креаторов...",
        tariffsHeader: "Доступные тарифы",

        // Страница студии (studio.html)
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
        inventoryTitle: "Ваш инвентарь"
    }
};

// Функция смены языка
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

// Автоматический запуск при загрузке страницы
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
