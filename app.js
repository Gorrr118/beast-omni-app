const translations = {
    en: {
        greeting: "Hello, filatow",
        heroTitle: "BEAST OMNI",
        heroDesc: "An innovative ecosystem of interactive widgets for streamers and creators. Turn your live stream into a full show with custom characters, unique fonts, and exclusive voice acting, running in real-time via OBS / Streamlabs.",
        tariffsTitle: "Available Tariffs",
        t1Name: "SHORTS BASE",
        t1Features: [
            "Ideal solution for TikTok, Shorts & Reels creators",
            "1 active interactive widget on account",
            "Access to standard system fonts",
            "Limit: 500 views per month"
        ],
        t1Btn: "Activate",
        t2Name: "MEDIUM PRO",
        t2Features: [
            "Up to 10 simultaneously running widgets",
            "Complete removal of Beast Omni watermark",
            "Access to the starter collection of characters",
            "5 premium glowing fonts of your choice",
            "Limit: 15,000 views per month"
        ],
        t2Btn: "Buy PRO",
        t3Name: "ADVANCED OMNI",
        t3Features: [
            "Extended functionality and integration",
            "Up to 25 simultaneously running widgets",
            "Access to premium game and anime characters",
            "10 exclusive cyber-fonts to choose from",
            "Limit: 50,000 views per month"
        ],
        t3Btn: "Upgrade Plan",
        t4Name: "ULTIMATE KING",
        t4Features: [
            "Absolute unlimited widget creation",
            "Full access to ALL characters & secret fonts",
            "Exclusive animated voice packs for free",
            "Max FPS for hyper-smooth animations",
            "Priority VIP support 24/7"
        ],
        t4Btn: "Become KING",
        shopTitle: "In-App Store",
        shopDesc: "Customize your streams down to the smallest detail! In our shop you will find legendary characters from your favorite games, anime, and TV shows that react to viewers' actions. Unique neon and gothic fonts will highlight your alerts, and live character voices at the bottom of the screen will encourage your audience to donate more often.",
        paymentTitle: "Convenient and Fast Payments",
        paymentDesc: "We value your comfort, which is why we integrated the most modern and secure instant payment methods. Top up your balance and activate plans using Telegram Stars inside the app or use Telegram Wallet (Crypto) for fast transactions worldwide.",
        securityTitle: "Enterprise-Grade Security",
        securityFeatures: [
            { title: "🔒 AES-256 Encryption", desc: "All system tokens and stream integrations (OBS, Streamlabs, Twitch) are encrypted on the server side. No third party can access your keys." },
            { title: "🛡️ Telegram Sandbox", desc: "Authorization is strictly managed through official Telegram WebApp cryptohash verification. Your personal data is fully safe." },
            { title: "💎 Secure Payments", desc: "We never store card or bank details. All transactions go through Telegram Stars or secured non-custodial crypto networks." },
            { title: "⚡ Zero Vulnerability", desc: "Widget source code is completely sandboxed inside the OBS Browser Source. No performance drops, no background tracking, no malware." }
        ],
        supportTitle: "Have any questions?",
        supportDesc: "Our support team is ready to help you with OBS setup or troubleshooting at any time of the day.",
        supportBtn: "💬 Contact Support",
        navHome: "Home",
        navRef: "Referral",
        navWidget: "Widgets",
        navShop: "Shop"
    },
    ru: {
        greeting: "Привет, filatow",
        heroTitle: "BEAST OMNI",
        heroDesc: "Инновационная экосистема интерактивных виджетов для стримеров и креаторов. Превратите ваш прямой эфир в полноценное шоу с помощью кастомных персонажей, уникальных шрифтов и эксклюзивной озвучки, работающих в реальном времени через OBS / Streamlabs.",
        tariffsTitle: "Доступные Тарифы",
        t1Name: "SHORTS BASE",
        t1Features: [
            "Идеал для авторов TikTok, Shorts и Reels",
            "1 активный интерактивный виджет на аккаунте",
            "Доступ к стандартным системным шрифтам",
            "Лимит: 500 просмотров в месяц"
        ],
        t1Btn: "Активировать",
        t2Name: "MEDIUM PRO",
        t2Features: [
            "До 10 одновременно работающих виджетов",
            "Полное удаление водяного знака Beast Omni",
            "Доступ к стартовой коллекции персонажей",
            "5 премиальных светящихся шрифтов на выбор",
            "Лимит: 15 000 просмотров в месяц"
        ],
        t2Btn: "Купить PRO",
        t3Name: "ADVANCED OMNI",
        t3Features: [
            "Расширенный функционал и повышенные лимиты",
            "До 25 одновременно работающих виджетов",
            "Доступ к премиум-персонажам игр и сериалов",
            "10 эксклюзивных кибер-шрифтов на выбор",
            "Лимит: 50 000 просмотров в месяц"
        ],
        t3Btn: "Расширить тариф",
        t4Name: "ULTIMATE KING",
        t4Features: [
            "Абсолютный безлимит на создание виджетов",
            "Полный доступ ко ВСЕМ персонажам и секретным шрифтам",
            "Эксклюзивные анимированные голосовые паки бесплатно",
            "Максимальный FPS для гипер-плавной анимации",
            "Приоритетная VIP-поддержка 24/7"
        ],
        t4Btn: "Стать KING",
        shopTitle: "Внутриигровой Магазин",
        shopDesc: "Кастомизируйте свои стримы до мельчайших деталей! В нашем магазине вы найдете легендарных персонажей из ваших любимых игр, аниме и сериалов, которые будут реагировать на действия зрителей. Уникальные неоновые и готические шрифты выделят ваши уведомления, а живые голоса персонажей, звучащие прямо внизу экрана, заставят аудиторию донатить чаще.",
        paymentTitle: "Удобная и быстрая оплата",
        paymentDesc: "Мы ценим ваш комфорт, поэтому интегрировали самые современные и безопасные методы моментальной оплаты. Пополняйте баланс и активируйте тарифы с помощью Telegram Stars прямо внутри мессенджера или используйте Telegram Wallet (Крипта) для быстрых транзакций по всему миру.",
        securityTitle: "Безопасность и Надежность",
        securityFeatures: [
            { title: "🔒 Шифрование AES-256", desc: "Все интеграционные токены (OBS, Streamlabs, Twitch) шифруются на стороне сервера. Никто, кроме вашего виджета, не имеет к ним доступа." },
            { title: "🛡️ Защита через Telegram", desc: "Авторизация происходит через официальный протокол Telegram WebApp с валидацией криптографического хеша. Ваши данные защищены." },
            { title: "💎 Безопасные транзакции", desc: "Мы не собираем и не храним платежные данные. Оплата через Telegram Stars и проверенные криптокошельки исключает утечки." },
            { title: "⚡ Изоляция кода (Sandbox)", desc: "Код виджетов полностью изолирован внутри OBS Browser Source. Никаких скрытых трекеров, майнеров или уязвимостей для ПК." }
        ],
        supportTitle: "Возникли вопросы?",
        supportDesc: "Наша команда поддержки готова помочь вам с настройкой OBS или решением проблем в любое время суток.",
        supportBtn: "💬 Написать в поддержку",
        navHome: "Главная",
        navRef: "Рефералка",
        navWidget: "Виджеты",
        navShop: "Магазин"
    },
    am: {
        greeting: "Ողջույն, filatow",
        heroTitle: "BEAST OMNI",
        heroDesc: "Ինտերակտիվ վիջեթների նորարարական էկոհամակարգ սթրիմերների և հեղինակների համար: Դարձրեք ձեր ուղիղ եթերը լիարժեք շոու՝ հնարավորություն ունենալով օգտագործել կերպարներ, յուրահատուկ տառատեսակներ և բացառիկ ձայնային էֆեկտներ իրական ժամանակում OBS / Streamlabs-ի միջոցով:",
        tariffsTitle: "Հասանելի Սակագներ",
        t1Name: "SHORTS BASE",
        t1Features: [
            "Իդեալական լուծում TikTok, Shorts և Reels ստեղծողների համար",
            "1 ակտիվ ինտերակտիվ վիջեթ հաշվում",
            "Հասանելիություն ստանդարտ համակարգային տառատեսակներին",
            "Լիմիտ՝ 500 դիտում ամսական"
        ],
        t1Btn: "Ակտիվացնել",
        t2Name: "MEDIUM PRO",
        t2Features: [
            "Մինչև 10 միաժամանակ աշխատող վիջեթներ",
            "Beast Omni ջրային նշանի ամբողջական հեռացում",
            "Հասանելիություն կերպարների մեկնարկային հավաքածուին",
            "5 պրեմիում լուսավորվող տառատեսակ ընտրությամբ",
            "Լիմիտ՝ 15 000 դիտում ամսական"
        ],
        t2Btn: "Գնել PRO",
        t3Name: "ADVANCED OMNI",
        t3Features: [
            "Ընդլայնված ֆունկցիոնալություն և բարձրացված լիմիտներ",
            "Մինչև 25 միաժամանակ աշխատող վիջեթներ",
            "Հասանելիություն խաղերի և սերիալների պրեմիում կերպարներին",
            "10 էքսկլյուզիվ կիբեր-տառատեսակ ընտրությամբ",
            "Լիմիտ՝ 50 000 դիտում ամսական"
        ],
        t3Btn: "Ընդլայնել",
        t4Name: "ULTIMATE KING",
        t4Features: [
            "Բացարձակ անսահմանափակ վիջեթների ստեղծում",
            "Ամբողջական հասանելիություն ԲՈԼՈՐ կերպարներին և գաղտնի տառատեսակներին",
            "Էքսկլյուզիվ անիմացիոն ձայնային փաթեթներ անվճար",
            "Մաքսիմալ FPS սահուն անիմացիայի համար",
            "Առաջնահերթ VIP աջակցություն 24/7"
        ],
        t4Btn: "Դառնալ KING",
        shopTitle: "Խանութ",
        shopDesc: "Կարգավորեք ձեր սթրիմերը մինչև ամենափոքր դետալները: Մեր խանութում դուք կգտնեք լեգենդար կերպարներ ձեր սիրելի խաղերից, անիմեներից և սերիալներից, որոնք կարձագանքեն հանդիսատեսի գործողություններին: Յուրահատուկ նեոնային և գոթական տառատեսակները կառանձնացնեն ձեր ծանուցումները:",
        paymentTitle: "Հարմարավետ և արագ վճարումներ",
        paymentDesc: "Մենք գնահատում ենք ձեր հարմարավետությունը, այդ իսկ պատճառով ինտեգրել ենք վճարման ամենաժամանակակից մեթոդները: Ակտիվացրեք սակագները Telegram Stars-ի միջոցով հենց մեսենջերում կամ օգտագործեք Telegram Wallet (Crypto):",
        securityTitle: "Անվտանգություն և Հուսալիություն",
        securityFeatures: [
            { title: "🔒 AES-256 Ծածկագրում", desc: "Բոլոր ինտեգրման թոքենները (OBS, Streamlabs) ծածկագրվում են սերվերի կողմից: Ոչ ոք, բացի ձեր վիջեթից, հասանելիություն չունի:" },
            { title: "🛡️ Telegram Պաշտպանություն", desc: "Մուտքը կատարվում է պաշտոնական Telegram WebApp արձանագրությամբ՝ կրիպտոգրաֆիկ հեշի վավերացմամբ:" },
            { title: "💎 Անվտանգ գործարքներ", desc: "Մենք չենք պահպանում վճարային տվյալներ: Telegram Stars-ի և կրիպտո դրամապանակների միջոցով վճարումները բացառում են ռիսկերը:" },
            { title: "⚡ Վիջեթների մեկուսացում", desc: "Վիջեթների կոդը լիովին մեկուսացված է OBS բրաուզերում: Չկան թաքնված մայնեռներ կամ վիրուսներ ձեր ԱՀ-ի համար:" }
        ],
        supportTitle: "Ունե՞ք հարցեր",
        supportDesc: "Մեր աջակցման թիմը պատրաստ է օգնել ձեզ OBS-ի կարգավորման հարցում օրվա ցանկացած ժամի:",
        supportBtn: "💬 Գրել աջակցմանը",
        navHome: "Գլխավոր",
        navRef: "Ռեֆերալ",
        navWidget: "Վիջեթներ",
        navShop: "Խանութ"
    }
};

function changeLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    const textMappings = {
        "user-greeting": data.greeting,
        "hero-title": data.heroTitle,
        "hero-desc": data.heroDesc,
        "tariffs-title": data.tariffsTitle,
        "t1-name": data.t1Name,
        "t2-name": data.t2Name,
        "t3-name": data.t3Name,
        "t4-name": data.t4Name,
        "t1-btn": data.t1Btn,
        "t2-btn": data.t2Btn,
        "t3-btn": data.t3Btn,
        "t4-btn": data.t4Btn,
        "shop-info-title": data.shopTitle,
        "shop-info-desc": data.shopDesc,
        "payment-title": data.paymentTitle,
        "payment-desc": data.paymentDesc,
        "security-title": data.securityTitle,
        "support-title": data.supportTitle,
        "support-desc": data.supportDesc,
        "nav-home": data.navHome,
        "nav-ref": data.navRef,
        "nav-widget": data.navWidget,
        "nav-shop": data.navShop
    };

    for (const [id, text] of Object.entries(textMappings)) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    updateList("t1-features", data.t1Features);
    updateList("t2-features", data.t2Features);
    updateList("t3-features", data.t3Features);
    updateList("t4-features", data.t4Features);

    const supportLink = document.querySelector(".btn-support");
    if (supportLink) supportLink.innerText = data.supportBtn;

    updateSecurityGrid(data.securityFeatures);
}

function updateList(elementId, itemsArray) {
    const ul = document.getElementById(elementId);
    if (!ul) return;
    ul.innerHTML = "";
    if (itemsArray && Array.isArray(itemsArray)) {
        itemsArray.forEach(item => {
            const li = document.createElement("li");
            li.innerText = item;
            ul.appendChild(li);
        });
    }
}

function updateSecurityGrid(featuresArray) {
    const container = document.getElementById("security-features-container");
    if (!container) return;
    container.innerHTML = "";
    
    if (featuresArray && Array.isArray(featuresArray)) {
        featuresArray.forEach(item => {
            const card = document.createElement("div");
            card.className = "security-item";
            
            const h4 = document.createElement("h4");
            h4.innerText = item.title;
            
            const p = document.createElement("p");
            p.innerText = item.desc;
            
            card.appendChild(h4);
            card.appendChild(p);
            container.appendChild(card);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("lang-dropdown");
    if(dropdown) dropdown.value = "en";
    changeLanguage("en");
});
     
