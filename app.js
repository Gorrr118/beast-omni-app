let tg = window.Telegram.WebApp;
tg.expand();

const i18n = {
    ru: {
        home: "ГЛАВНАЯ", stats: "АКТИВЫ", refs: "ПАРТНЕРЫ", tariffs: "ТАРИФЫ", gift: "БОНУС",
        creation: "ULTIMATE GENERATION 2.0", create_btn: "ЗАПУСТИТЬ ТЕРМИНАЛ",
        project_t: "ЭКОСИСТЕМА BEAST OMNI", plans_t: "ТАРИФНЫЕ ПЛАНЫ", sec_t: "БЕЗОПАСНОСТЬ ДАННЫХ", pay_t: "СПОСОБЫ ОПЛАТЫ",
        supp_t: "ЭЛИТНАЯ ПОДДЕРЖКА 24/7", supp_b: "СВЯЗАТЬСЯ С ПОДДЕРЖКОЙ", spin: "КРУТИТЬ КОЛЕСО", back: "← НАЗАД", lucky: "BEAST LUCK",
        ref_title: "ПАРТНЕРСКАЯ СЕТЬ",
        ref_desc: "Добро пожаловать в высшую лигу. Ваша ссылка — это ключ к <strong>пассивному доходу</strong>. Получайте <b style='color:var(--accent-blue)'>+1.00 Stars</b> за каждого приглашенного резидента и пожизненную комиссию <strong>15%</strong> с каждой их сделки. Накопленные активы можно обналичивать или обменивать на <strong>эксклюзивные ассеты</strong> в Beast Market: уникальные шрифты, нейро-голоса и приоритетные мощности.",
        ref_btn: "ПРИГЛАСИТЬ ПАРТНЕРА",
        ref_perks_t: "ЭЛИТНЫЕ ПРИВИЛЕГИИ",
        ref_perks_d: "Партнеры Beast Omni получают ранний доступ к закрытым нейросетевым моделям и персональным калибровкам весов.",
        desc_p: "<strong>Beast Omni</strong> — это цифровая сингулярность. Мы развернули <strong>высокопроизводительные графические кластеры</strong>, работающие в синергии с авторскими весами нейросетей. В то время как другие предлагают шаблоны, мы даем <strong>бескомпромиссную детализацию</strong> и фотореалистичную физику света. Beast Omni оптимизирован для задач запредельной сложности. Добро пожаловать в высшую лигу визуального доминирования.",
        desc_s: "Ваша приватность — наша фундаментальная ценность. Вся архитектура построена на протоколах <strong>Zero-Knowledge</strong> и военном шифровании <strong>AES-256-GCM</strong>. Сразу после завершения сессии система <strong>безвозвратно уничтожает</strong> все временные кэши и промпты. Мы не собираем логи — в Beast Omni вы остаетесь невидимым творцом под защитой совершенных алгоритмов.",
        desc_pay: "Для обеспечения полной анонимности мы интегрировали расчеты в <strong>Telegram Stars</strong> для мгновенных покупок и <strong>Telegram Wallet (TON/Crypto)</strong> для децентрализации. Каждая транзакция подтверждается блокчейном, формируя прозрачную среду. Ваша финансовая свобода и безопасность платежей остаются незыблемыми.",
        desc_supp: "Наши инженеры мониторят систему 24/7. <span style='color:#ff3b30; font-weight: 800;'>ВНИМАНИЕ:</span> Для мгновенного отклика используйте только <strong>официальный тикет-бот</strong>. Бот автоматически приоритизирует заявку и свяжет вас с нужным отделом. Мы здесь, чтобы ваша работа не прерывалась ни на секунду.",
        plans: [
            {n:"STARTER", p:"$5", f:"• 5 экспресс-генераций ежесуточно<br>• Доступ к High-Definition ядру<br>• Стандартный приоритет в очереди"},
            {n:"STANDARD", p:"$15", f:"• 15 Full HD генераций ежедневно<br>• Полное удаление водяных знаков<br>• Приоритетный доступ к серверам"},
            {n:"ADVANCED", p:"$30", f:"• 40 Cinematic-сессий в месяц<br>• Профессиональная настройка промптов<br>• Ускоренный рендер сложных текстур"},
            {n:"ELITE", p:"$50", f:"• 80 генераций в Ultra 2K качестве<br>• Доступ к закрытым бета-моделям<br>• Выделенный поток данных"},
            {n:"ULTIMATE", p:"$100", f:"• ПОЛНЫЙ БЕЗЛИМИТ 24/7<br>• Максимальное 4K Cinematic качество<br>• Индивидуальный тюнинг модели под вас"}
        ]
    },
    en: {
        home: "HOME", stats: "STATS", refs: "REFS", tariffs: "PLANS", gift: "BONUS",
        creation: "ULTIMATE GENERATION 2.0", create_btn: "LAUNCH TERMINAL",
        project_t: "BEAST OMNI ECOSYSTEM", plans_t: "TARIFF PLANS", sec_t: "DATA SECURITY", pay_t: "PAYMENT METHODS",
        supp_t: "24/7 ELITE SUPPORT", supp_b: "CONTACT SUPPORT", spin: "SPIN WHEEL", back: "← BACK", lucky: "BEAST LUCK",
        ref_title: "AFFILIATE SYSTEM",
        ref_desc: "Get +1 ⭐️ STARS for every friend you invite! Plus 15% lifetime commission from their deals.",
        ref_btn: "INVITE PARTNERS",
        ref_perks_t: "ELITE PERKS & EXCHANGE",
        ref_perks_d: "Exchange your earned Stars for cool features: secret prompts, high-speed render, and unique functions.",
        desc_p: "<strong>Beast Omni</strong> is not just a tool, it's a digital singularity in the world of generative art. We've deployed high-performance GPU clusters. Uncompromising detail and photorealistic light physics. Welcome to the major league of visual dominance.",
        desc_s: "Your privacy is our ultimate priority. Zero-Knowledge protocols and military-grade AES-256-GCM encryption. We do not collect logs or store your creative history.",
        desc_pay: "We accept Telegram Stars and Telegram Wallet (TON/Crypto) for decentralization. Fast, safe, and blockchain-confirmed transactions.",
        desc_supp: "Engineers monitor the system 24/7. Use the official ticket bot only for instant support. We are here to ensure your workflow never stops.",
        plans: [
            {n:"STARTER", p:"$5", f:"• 5 daily express generations<br>• High-Definition core access<br>• Standard queue priority"},
            {n:"STANDARD", p:"$15", f:"• 15 Full HD generations daily<br>• Complete watermark removal<br>• Priority server access"},
            {n:"ADVANCED", p:"$30", f:"• 40 Cinematic sessions monthly<br>• Professional prompt tuning<br>• Accelerated complex rendering"},
            {n:"ELITE", p:"$50", f:"• 80 Ultra 2K generations<br>• Access to private beta models<br>• Dedicated data stream"},
            {n:"ULTIMATE", p:"$100", f:"• UNLIMITED ACCESS 24/7<br>• Maximum 4K Cinematic quality<br>• Individual model weight tuning"}
        ]
    }
};

function changeLanguage(lang) {
    const t = i18n[lang];
    if (!t) return;
    const updates = {
        'tab-home': t.home, 'tab-stats': t.stats, 'tab-refs': t.refs, 'tab-plans': t.tariffs, 'tab-gift': t.gift,
        'l-creation': t.creation, 'l-create-btn': t.create_btn, 'l-title-project': t.project_t,
        'l-title-plans': t.plans_t, 'l-title-sec': t.sec_t, 'l-title-pay': t.pay_t, 'l-title-supp': t.supp_t,
        'l-btn-supp': t.supp_b, 'l-spin': t.spin, 'l-back': t.back, 'l-lucky': t.lucky,
        'ref-title': t.ref_title, 'ref-desc': t.ref_desc, 'ref-btn-text': t.ref_btn,
        'l-ref-perks-title': t.ref_perks_t, 'l-ref-perks-desc': t.ref_perks_d
    };
    for (let id in updates) {
        const el = document.getElementById(id);
        if (el) el.innerText = updates[id];
    }
    const htmlUpdates = {
        'l-desc-project': t.desc_p, 'l-desc-sec': t.desc_s, 'l-desc-pay': t.desc_pay, 'l-desc-supp': t.desc_supp
    };
    for (let id in htmlUpdates) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = htmlUpdates[id];
    }
    const container = document.getElementById('packages-container');
    if (container) {
        container.innerHTML = t.plans.map(p => `
            <div class="package-item" style="${p.n === 'ULTIMATE' ? 'border-color:var(--accent-blue)' : ''}">
                <div class="package-header"><span class="package-name">${p.n}</span><span class="package-price">${p.p}</span></div>
                <div class="package-features">${p.f}</div>
            </div>
        `).join('');
    }
}

const prizes = [{n:"0.1",c:"#121212"},{n:"0.5",c:"#1a1a1a"},{n:"0.1",c:"#121212"},{n:"1.0",c:"#007aff"},{n:"0.1",c:"#121212"},{n:"2.0",c:"#1a1a1a"},{n:"0.1",c:"#121212"},{n:"0.0",c:"#000"}];

function drawWheel() { 
    const ctx = document.getElementById('wheel-canvas').getContext('2d'); 
    if (!ctx) return;
    ctx.clearRect(0,0,600,600); 
    prizes.forEach((p, i) => { 
        ctx.beginPath(); ctx.fillStyle = p.c; ctx.moveTo(300, 300); 
        ctx.arc(300, 300, 300, i*(Math.PI/4), (i+1)*(Math.PI/4)); ctx.fill();
        ctx.save(); ctx.translate(300,300); ctx.rotate(i*(Math.PI/4)+Math.PI/8);
        ctx.fillStyle="#fff"; ctx.font="900 46px Montserrat"; ctx.textAlign="right";
        ctx.fillText(p.n, 280, 15); ctx.restore(); 
    }); 
}

function runWheel() { 
    const canvas = document.getElementById('wheel-canvas'); 
    if (!canvas) return;
    const idx = Math.floor(Math.random()*prizes.length); 
    canvas.style.transform = `rotate(${3600+(idx*45)}deg)`; 
    setTimeout(() => { tg.showAlert("Jackpot Win!"); }, 4600); 
}

function openGiftModal() { document.getElementById('gift-modal').style.display='flex'; drawWheel(); }
function closeGiftModal() { document.getElementById('gift-modal').style.display='none'; }

window.onload = () => { 
    setTimeout(() => { 
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.style.opacity='0'; 
            setTimeout(()=> splash.style.display='none', 500);
        }
    }, 2800);
    if(tg.initDataUnsafe?.user) {
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) userNameEl.innerText = tg.initDataUnsafe.user.first_name.toUpperCase();
    }
    changeLanguage('ru'); 
};

function openRefs() {
    document.getElementById('refs-screen').style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const tab = document.getElementById('tab-refs');
    if(tab) tab.classList.add('active');
    tg.HapticFeedback.impactOccurred('medium');
}

function closeRefs() {
    document.getElementById('refs-screen').style.display = 'none';
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const tab = document.getElementById('tab-home');
    if(tab) tab.classList.add('active');
}

function sharePartnerLink() {
    const userId = tg.initDataUnsafe?.user?.id || "0";
    const botUser = "beast_omni_bot"; 
    const refLink = `https://t.me/${botUser}?start=ref${userId}`;
    const message = "Забирай +1 ⭐️ Stars и доступ к Beast Omni по моей ссылке! 🔥";
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(message)}`;
    if (window.Telegram?.WebApp) {
        tg.openTelegramLink(shareUrl);
        tg.HapticFeedback.impactOccurred('heavy');
    } else {
        window.open(shareUrl, '_blank');
    }
}