const translations = {
    en: {
        greeting: "Hello, filatow",
        navHome: "Home",
        navReferral: "Referral",
        navStudio: "Studio",
        navWidgets: "Widgets",
        navShop: "Tegs",
        navObs: "obs Settings",

        // Ключи для страницы генератора тегов
        tagGenTitle: "🚀 AI Tag Generator",
        tagGenSubtitle: "Describe the essence or plot of your stream/video, and the system will create perfect tags.",
        tagGenPlaceholder: "Example: streaming how we play a shooter with cats and keep losing because of memes...",
        tagGenBtn: "Generate Tags ⚡",
        tagResultTitle: "📌 Result",
        tagCopyBtn: "Copy tags to clipboard",

        preloaderStatus: "Loading Ecosystem...",
        heroDesc: "An innovative ecosystem of interactive widgets for streamers and creators. Turn your live stream into a full show with custom characters, unique fonts, and exclusive voice acting, running in real-time via OBS / Streamlabs. Expand your broadcasting boundaries, increase audience retention by several times, and scale your personal brand using advanced automation technologies that work smoothly, seamlessly, and without heavy CPU load on your gaming station.",
        tariffsTitle: "Available Tariffs",
        
        t1Badge: "SHORTS / REELS",
        t1Name: "SHORTS BASE",
        t1Desc: "Perfect start for vertical content creators. Bring your TikTok, Shorts, and Reels to life with specialized interactive mechanics designed specifically for fast-paced content, helping you stand out in smart algorithms, capture viewer attention from the first second, and boost your organic metric growth effortlessly!",
        perMo: "/mo",
        t1f1: "Ideal solution for TikTok, Shorts & Reels creators looking for steady explosive growth",
        t1f2: "1 active interactive widget running simultaneously on your account without any delays",
        t1f3: "Full access to standard system fonts and basic text layouts for clean styling",
        t1f4: "Strict limit: 500 processing views per month, tailored for starting projects and testing core features",
        activateBtn: "Activate",

        t2Badge: "POPULAR",
        t2Name: "MEDIUM PRO",
        t2Desc: "The choice of active streamers. Complete audience immersion without watermarks and with neon fonts! This tier offers deeper customization tools, allowing you to establish a strong visual bond with your chat, launch multi-layered interactive alerts, and elevate your production value to professional streaming standards.",
        t2f1: "Up to 10 simultaneously running widgets to handle sub goals, chat alerts, and active alerts at once",
        t2f2: "Complete removal of TEGS watermark from all overlays to keep your stream brand 100% clean",
        t2f3: "Unrestricted access to the starter collection of characters, complete with smooth animations",
        t2f4: "5 premium glowing neon fonts of your choice to perfectly match your channel's unique aesthetic",
        t2f5: "Extended limit: 15,000 processed views per month, ideal for channels with active, growing communities",
        t2Btn: "Buy PRO",

        t3Badge: "EXTENDED",
        t3Name: "ADVANCED OMNI",
        t3Desc: "Hardcore creator level. Premium game and anime characters that make your stream unforgettable! Unlock state-of-the-art interactive systems, complex triggering conditions, and elite-tier design features that completely redefine how your live chat influences your stream overlay in real-time broadcasts.",
        t3f1: "Extended functionality, higher API priority, and massively increased volume limits for power users",
        t3f2: "Up to 25 simultaneously running widgets, allowing you to craft a completely unique custom interface",
        t3f3: "Access to premium game and anime characters with special event triggers and reactive gestures",
        t3f4: "10 exclusive cyber-fonts to choose from, guaranteeing high-tech look for alerts and overlays",
        t3f5: "High limit: 50,000 views per month, engineered for established streamers with heavy daily chat interactions",
        upgradeBtn: "Upgrade",

        t4Badge: "UNLIMITED",
        t4Name: "ULTIMATE KING",
        t4Desc: "Absolute power over the stream. Unlimited widgets, exclusive voice acting, and VIP status. You are the King here! This is the ultimate corporate-grade solution for elite content creators and streaming organizations who require maximum performance, unique assets, and absolute creative freedom without boundaries.",
        t4f1: "Absolute unlimited widget creation and parallel operations with maximum server response speeds",
        t4f2: "Full unhindered access to ALL premium characters, special variants, and hidden legendary fonts",
        t4f3: "Exclusive animated voice packs included completely for free to shock and entertain your audience",
        t4f4: "Max FPS mode for hyper-smooth web animations and fluid widget rendering directly inside OBS Studio",
        t4f5: "Priority VIP support 24/7 with a dedicated personal account manager to solve any technical issues instantly",
        kingBtn: "Become KING",

        shopInfoTitle: "In-App Store",
        shopInfoDesc: "Customize your streams down to the smallest detail! In our shop you will find legendary characters from your favorite games, anime, and TV shows that react to viewers' actions. Unique neon and gothic fonts will highlight your alerts, and live character voices at the bottom of the screen will encourage your audience to donate more often. Expand your personal asset collection, unlock seasonal content drops, and acquire rare aesthetic bundles that turn your stream overlay into an exclusive piece of interactive art, ensuring your community stays highly engaged and constantly entertained during long broadcasting marathons.",
        
        paymentTitle: "Convenient and Fast Payments",
        paymentDesc: "We value your comfort, which is why we integrated the most modern and secure instant payment methods. Top up your balance and activate plans using Telegram Stars inside the app or use Telegram Wallet (Crypto) for fast transactions worldwide. Enjoy flawless billing automation, immediate balance updates, and complete transparency on every single financial operation without hidden conversion fees or unexpected dynamic charges, allowing you to manage your streaming budget efficiently from anywhere on the planet.",
        payStars: "⭐ Telegram Stars",
        payCrypto: "💎 TG Wallet / Crypto",

        refPromoTitle: "Referral System",
        refPromoDesc: "Invite your friends to the TEGS ecosystem and get exclusive, awesome rewards from every purchase your friends make! Build your own elite network and scale together.",
        refPromoBtn: "👤 Invite Friend",

        securityTitle: "Enterprise-Grade Security",
        sec1Title: "🔒 AES-256 Encryption",
        sec1Desc: "All system tokens and stream integrations (OBS, Streamlabs, Twitch) are encrypted on the server side using the military-grade AES-256 protocol. This prevents data leaks and ensures that no malicious third party can ever gain access to your stream keys, sensitive internal configurations, or private user credentials under any circumstances.",
        sec2Title: "🛡️ Telegram Sandbox",
        sec2Desc: "Authorization is strictly managed through official Telegram WebApp cryptohash verification structures. Your personal data is fully safe because our system operates in a complete sandbox environment, preventing unauthorized sessions, token spoofing, or credential sniffing, making login attempts 100% ironclad and authenticated.",
        sec3Title: "💎 Secure Payments",
        sec3Desc: "We never store credit card numbers, banking details, or sensitive financial logs on our databases. All incoming transactions go through the official Telegram Stars engine or heavily secured non-custodial crypto networks, providing a decentralized, audited, and completely secure processing pipe for absolute peace of mind.",
        sec4Title: "⚡ Zero Vulnerability",
        sec4Desc: "Widget source code is completely sandboxed inside the OBS Browser Source architecture. This strict isolation ensures zero performance drops, zero background telemetry tracking, and total protection against malicious cross-site scripting or malware injection, keeping your local gaming computer running at peak FPS capacity.",

        supportTitle: "Have any questions?",
        supportOnline: "Online",
        supportDesc: "Our support team is ready to help you with OBS setup or troubleshooting at any time of the day. Whether you encounter a strange rendering bug, need help linking your stream account, or require guidance on custom font integration, our elite technical experts are online 24/7/365 to keep your broadcast running flawlessly without a single hitch.",
        supportBtn: "💬 Contact Support",

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
        inventoryTitle: "Your Inventory",

        badge_text: "PARTNER NETWORK 2.0",
        ref_title: "Build your media empire!",
        ref_desc: "Invite friends, earn Generation Coins, and process your videos for free.",
        your_bonus: "YOUR REWARD",
        your_bonus_val: "+100 Generation Coins",
        friend_bonus: "FRIEND START",
        friend_bonus_val: "Gift: +50 Coins",
        steps_title: "PROTOCOL WORKFLOW",
        step_1: "Tap the button below — your personal referral link will be copied to your clipboard.",
        step_2: "Your friend launches BEAST OMNI via your link and receives 50 bonus coins for their first video.",
        step_3: "You get 100 Generation Coins for every purchase your friend makes to power up your own video processing!",
        copy_btn_text: "COPY REFERRAL LINK",
        hint_sub: "One-tap copy for Telegram chats & creator communities",
        invited: "NODES LINKED",
        earned: "TOTAL EARNED",

        studio_badge: "30 AI AVATARS & SPEAKING MATRIX",
        studio_title: "Choose Your Power Level",
        studio_desc: "Unlock avatar packs with procedural lip-sync for streams, voiceovers, and video content.",
        btn_unlock_10: "UNLOCK 10 AVATARS",
        btn_unlock_20: "UNLOCK 20 AVATARS",
        btn_unlock_30: "GET FULL BASE (30)",
        matrix_title: "AVATAR CATALOG (30/30)",
        matrix_sub: "Tap a character to test lip-sync animation"
    },
    ru: {
        greeting: "Привет, filatow",
        navHome: "Главная",
        navReferral: "Рефералы",
        navStudio: "Студия",
        navWidgets: "Виджеты",
        navShop: "Теги",
        navObs: "obs Settings",

        // Ключи для страницы генератора тегов
        tagGenTitle: "🚀 AI Генератор Тегов",
        tagGenSubtitle: "Опиши суть или сюжет стрима/ролика, и система создаст идеальные теги.",
        tagGenPlaceholder: "Например: стримлю как мы с котиками играем в шутер и постоянно проигрываем из-за мемов...",
        tagGenBtn: "Сгенерировать теги ⚡",
        tagResultTitle: "📌 Результат",
        tagCopyBtn: "Копировать теги в буфер",

        preloaderStatus: "Загрузка экосистемы...",
        heroDesc: "Инновационная экосистема интерактивных виджетов для стримеров и креаторов. Превратите ваш прямой эфир в полноценное шоу с помощью кастомных персонажей, уникальных шрифтов и эксклюзивной озвучки, работающих в реальном времени через OBS / Streamlabs. Расширяйте границы своего вещания, увеличивайте удержание аудитории в несколько раз и масштабируйте личный бренд с помощью передовых технологий автоматизации, которые работают плавно, бесшовно и без высокой нагрузки на процессор вашей игровой станции.",
        tariffsTitle: "Доступные тарифы",

        t1Badge: "SHORTS / REELS",
        t1Name: "SHORTS BASE",
        t1Desc: "Идеальный старт для создателей вертикального контента. Вдохните жизнь в свои TikTok, Shorts и Reels с помощью специализированных интерактивных механик, разработанных специально для динамичного контента, помогая вам выделяться в умных алгоритмах, захватывать внимание зрителей с первой секунды и легко наращивать органические метрики!",
        perMo: "/мес",
        t1f1: "Идеальное решение для авторов TikTok, Shorts и Reels, стремящихся к стабильному взрывному росту",
        t1f2: "1 активный интерактивный виджет, работающий одновременно на вашем аккаунте без каких-либо задержек",
        t1f3: "Полный доступ к стандартным системным шрифтам и базовым текстовым макетам для аккуратного стиля",
        t1f4: "Строгий лимит: 500 просмотров обработки в месяц, идеально для старта проектов и тестирования ключевых функций",
        activateBtn: "Активировать",

        t2Badge: "ПОПУЛЯРНЫЙ",
        t2Name: "MEDIUM PRO",
        t2Desc: "Выбор активных стримеров. Полное погружение аудитории без водяных знаков и с неоновыми шрифтами! Этот тариф предлагает более глубокие инструменты кастомизации, позволяя установить прочную визуальную связь с чатом, запустить многоуровневые интерактивные алерты и поднять качество продакшена до профессиональных стандартов вещания.",
        t2f1: "До 10 одновременно работающих виджетов для обработки целей подписки, алертов чата и уведомлений сразу",
        t2f2: "Полное удаление водяного знака TEGS со всех оверлеев, чтобы бренд вашего стрима оставался на 100% чистым",
        t2f3: "Неограниченный доступ к стартовой коллекции персонажей в комплекте с плавной анимацией",
        t2f4: "5 премиальных светящихся неоновых шрифтов на ваш выбор, идеально дополняющих уникальную эстетику канала",
        t2f5: "Расширенный лимит: 15 000 обработанных просмотров в месяц, идеально для каналов с растущим комьюнити",
        t2Btn: "Купить PRO",

        t3Badge: "РАСШИРЕННЫЙ",
        t3Name: "ADVANCED OMNI",
        t3Desc: "Уровень хардкорного креатора. Премиальные игровые и аниме-персонажи, которые делают ваш стрим незабываемым! Разблокируйте новейшие интерактивные системы, сложные условия триггеров и дизайнерские функции элитного уровня, которые полностью меняют влияние живого чата на оверлей в реальном времени.",
        t3f1: "Расширенный функционал, высокий приоритет API и значительно увеличенные лимиты для продвинутых пользователей",
        t3f2: "До 25 одновременно работающих виджетов, позволяющих создать абсолютно уникальный кастомный интерфейс",
        t3f3: "Доступ к премиальным персонажам игр и аниме со специальными триггерами событий и реактивными жестами",
        t3f4: "10 эксклюзивных кибер-шрифтов на выбор, гарантирующих высокотехнологичный вид алертов и оверлеев",
        t3f5: "Высокий лимит: 50 000 просмотров в месяц, разработан для состоявшихся стримеров с высокой активностью чата",
        upgradeBtn: "Улучшить",

        t4Badge: "БЕЗЛИМИТ",
        t4Name: "ULTIMATE KING",
        t4Desc: "Абсолютная власть над стримом. Неограниченные виджеты, эксклюзивная озвучка и VIP-статус. Здесь вы король! Это абсолютное корпоративное решение для элитных креаторов и стриминговых организаций, которым требуется максимальная производительность, уникальные ассеты и полная творческая свобода.",
        t4f1: "Абсолютно неограниченное создание виджетов и параллельная работа с максимальной скоростью отклика сервера",
        t4f2: "Полный беспрепятственный доступ ко ВСЕМ премиальным персонажам, особым вариантам и скрытым легендарным шрифтам",
        t4f3: "Эксклюзивные анимированные войс-паки включены абсолютно бесплатно для шока и развлечения вашей аудитории",
        t4f4: "Режим Max FPS для сверхплавных веб-анимаций и рендеринга виджетов прямо внутри OBS Studio",
        t4f5: "Приоритетная VIP-поддержка 24/7 с выделенным персональным менеджером для мгновенного решения технических проблем",
        kingBtn: "Стать КОРУНЕМ",

        shopInfoTitle: "Магазин внутри приложения",
        shopInfoDesc: "Настраивайте свои стримы до мельчайших деталей! В нашем магазине вы найдете легендарных персонажей из ваших любимых игр, аниме и сериалов, которые реагируют на действия зрителей. Уникальные неоновые и готические шрифты подчеркнут ваши оповещения, а живые голоса персонажей внизу экрана будут стимулировать вашу аудиторию донатить чаще. Расширяйте личную коллекцию асстов, открывайте сезонные дропы и получайте редкие эстетические бандлы, превращающие ваш оверлей в эксклюзивное интерактивное искусство.",

        paymentTitle: "Удобные и быстрые платежи",
        paymentDesc: "Мы ценим ваш комфорт, поэтому интегрировали самые современные и безопасные методы мгновенной оплаты. Пополняйте баланс и активируйте планы с помощью Telegram Stars прямо внутри приложения или используйте Telegram Wallet (Crypto) для быстрых транзакций по всему миру. Наслаждайтесь безупречной автоматизацией биллинга, моментальным обновлением баланса и полной прозрачностью каждой финансовой операции.",
        payStars: "⭐ Telegram Stars",
        payCrypto: "💎 TG Wallet / Crypto",

        refPromoTitle: "Реферальная система",
        refPromoDesc: "Приглашайте друзей в экосистему TEGS и получайте эксклюзивные, крутые награды с каждой покупки ваших друзей! Создайте свою элитную сеть и масштабируйтесь вместе.",
        refPromoBtn: "👤 Пригласить друга",

        securityTitle: "Безопасность корпоративного уровня",
        sec1Title: "🔒 Шифрование AES-256",
        sec1Desc: "Все системные токены и стрим-интеграции (OBS, Streamlabs, Twitch) шифруются на стороне сервера по военному протоколу AES-256. Это предотвращает любые утечки данных и гарантирует, что ни одна третья сторона никогда не получит доступ к вашим ключам трансляции или личным учетным данным.",
        sec2Title: "🛡️ Песочница Telegram",
        sec2Desc: "Авторизация строго управляется через официальные структуры верификации криптохешей Telegram WebApp. Ваши личные данные полностью в безопасности, так как система работает в изолированной среде, исключая несанкционированные сессии, подделку токенов или перехват данных.",
        sec3Title: "💎 Безопасные платежи",
        sec3Desc: "Мы никогда не храним номера кредитных карт или финансовые логи на наших базах данных. Все транзакции проходят через официальный движок Telegram Stars или защищенные некастодиальные криптосети, обеспечивая децентрализованный и абсолютно надежный платежный шлюз.",
        sec4Title: "⚡ Нулевая уязвимость",
        sec4Desc: "Исходный код виджетов полностью изолирован внутри архитектуры OBS Browser Source. Эта строгая изоляция гарантирует отсутствие просадок производительности, фонового сбора телеметрии и защиту от вредоносных скриптов, оставляя вашу игровую станцию на пике FPS.",

        supportTitle: "Остались вопросы?",
        supportOnline: "Онлайн",
        supportDesc: "Наша служба поддержки готова помочь вам с настройкой OBS или устранением неполадок в любое время суток. Если вы столкнулись со странным багом рендеринга, нуждаетесь в помощи с привязкой аккаунта или интеграцией кастомных шрифтов, наши технические эксперты на связи 24/7/365.",
        supportBtn: "💬 Написать в поддержку",

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
        inventoryTitle: "Ваш инвентарь",

        badge_text: "ПАРТНЕРСКАЯ СЕТЬ 2.0",
        ref_title: "Построй свою медиа-империю!",
        ref_desc: "Приглашай друзей, получай коины генерации и обрабатывай видео бесплатно.",
        your_bonus: "ВАША НАГРАДА",
        your_bonus_val: "+100 Коинов генерации",
        friend_bonus: "БОНУС ДРУГУ",
        friend_bonus_val: "Подарок: +50 Коинов",
        steps_title: "ПРОТОКОЛ РАБОТЫ",
        step_1: "Нажми на кнопку ниже — твоя личная реферальная ссылка будет скопирована.",
        step_2: "Друг запускает BEAST OMNI по ссылке и получает 50 подарочных коинов на первое видео.",
        step_3: "Ты получаешь 100 коинов генерации с каждой покупки друга, чтобы бесплатно обрабатывать свои ролики!",
        copy_btn_text: "СКОПИРОВАТЬ ССЫЛКУ",
        hint_sub: "Копируй в один клик и отправляй в чаты стримеров",
        invited: "ПОДКЛЮЧЕНО УЗЛОВ",
        earned: "ВСЕГО ЗАРАБОТАНО",

        studio_badge: "30 AI АВАТАРОВ И МАТРИЦА РЕЧИ",
        studio_title: "Выбери свой уровень мощи",
        studio_desc: "Разблокируй паки аватаров с процедурной анимацией рта для стримов, озвучки и видео-контента.",
        btn_unlock_10: "РАЗБЛОКИРОВАТЬ 10 ПЕРСОВ",
        btn_unlock_20: "РАЗБЛОКИРОВАТЬ 20 ПЕРСОВ",
        btn_unlock_30: "ВЗЯТЬ ВСЮ БАЗУ (30)",
        matrix_title: "КАТАЛОГ АВАТАРОВ (30/30)",
        matrix_sub: "Нажми на персонажа, чтобы протестировать анимацию рта"
    }
};

// ... ваш объект translations ...

function changeLanguage(lang) {
    const langData = translations[lang];
    if (!langData) {
        console.error(`Language '${lang}' not found.`);
        return;
    }

    localStorage.setItem('selectedLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = langData[key];

        if (translation !== undefined) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        } else {
            console.warn(`Translation key '${key}' not found for lang '${lang}'`);
        }
    });

    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.value = lang;
}
