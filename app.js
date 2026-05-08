let tg = window.Telegram.WebApp;
tg.expand();

const i18n = {
    ru: {
        home: "ГЛАВНАЯ", stats: "АКТИВЫ", refs: "ПАРТНЕРЫ", tariffs: "ТАРИФЫ", gift: "БОНУС",
        creation: "ULTIMATE GENERATION 2.0", create_btn: "ЗАПУСТИТЬ ТЕРМИНАЛ",
        project_t: "ЭКОСИСТЕМА BEAST OMNI", plans_t: "ТАРИФНЫЕ ПЛАНЫ", sec_t: "БЕЗОПАСНОСТЬ ДАННЫХ",
        supp_t: "ЭЛИТНАЯ ПОДДЕРЖКА 24/7", supp_b: "СВЯЗАТЬСЯ С ПОДДЕРЖКОЙ", spin: "КРУТИТЬ КОЛЕСО", back: "← НАЗАД", lucky: "BEAST LUCK",
        ref_title: "ПАРТНЕРСКАЯ СЕТЬ",
        ref_desc: "Добро пожаловать в высшую лигу. Получайте +1.00 Stars за каждого резидента и 15% комиссии.",
        ref_btn: "ПРИГЛАСИТЬ ПАРТНЕРА",
        desc_p: "<strong>Beast Omni</strong> — это цифровая сингулярность. Бескомпромиссная детализация и фотореалистичная физика света.",
        desc_s: "Ваша приватность — наша ценность. Архитектура <strong>Zero-Knowledge</strong> и шифрование AES-256.",
        desc_supp: "Наши инженеры мониторят систему 24/7. Используйте официальный тикет-бот.",
        plans: [
            {n:"STARTER", p:"$5", f:"• 5 генераций ежесуточно<br>• High-Definition ядро"},
            {n:"ELITE", p:"$50", f:"• 80 генераций в Ultra 2K<br>• Доступ к бета-моделям"},
            {n:"ULTIMATE", p:"$100", f:"• ПОЛНЫЙ БЕЗЛИМИТ 24/7<br>• Индивидуальный тюнинг"}
        ]
    },
    en: {
        home: "HOME", stats: "STATS", refs: "REFS", tariffs: "PLANS", gift: "BONUS",
        creation: "ULTIMATE GENERATION 2.0", create_btn: "LAUNCH TERMINAL",
        project_t: "BEAST OMNI ECOSYSTEM", plans_t: "TARIFF PLANS", sec_t: "DATA SECURITY",
        supp_t: "24/7 ELITE SUPPORT", supp_b: "CONTACT SUPPORT", spin: "SPIN WHEEL", back: "← BACK", lucky: "BEAST LUCK",
        ref_title: "AFFILIATE SYSTEM",
        ref_desc: "Join the league. Get +1.00 Stars for every invite and 15% lifetime commission.",
        ref_btn: "INVITE PARTNER",
        desc_p: "<strong>Beast Omni</strong> is a digital singularity. Uncompromising detail and photorealistic light.",
        desc_s: "Privacy is our priority. <strong>Zero-Knowledge</strong> architecture and AES-256 encryption.",
        desc_supp: "Engineers online 24/7. Use official ticket bot for support.",
        plans: [
            {n:"STARTER", p:"$5", f:"• 5 daily generations<br>• HD Core access"},
            {n:"ELITE", p:"$50", f:"• 80 Ultra 2K generations<br>• Beta models access"},
            {n:"ULTIMATE", p:"$100", f:"• FULL UNLIMITED 24/7<br>• Model weight tuning"}
        ]
    }
};

function changeLanguage(lang) {
    const t = i18n[lang];
    document.getElementById('tab-home').innerText = t.home;
    document.getElementById('tab-stats').innerText = t.stats;
    document.getElementById('tab-refs').innerText = t.refs;
    document.getElementById('tab-plans').innerText = t.tariffs;
    document.getElementById('tab-gift').innerText = t.gift;
    
    document.getElementById('l-creation').innerText = t.creation;
    document.getElementById('l-create-btn').innerText = t.create_btn;
    document.getElementById('l-title-project').innerText = t.project_t;
    document.getElementById('l-desc-project').innerHTML = t.desc_p;
    document.getElementById('l-title-plans').innerText = t.plans_t;
    document.getElementById('l-title-sec').innerText = t.sec_t;
    document.getElementById('l-desc-sec').innerHTML = t.desc_s;
    document.getElementById('l-title-supp').innerText = t.supp_t;
    document.getElementById('l-desc-supp').innerHTML = t.desc_supp;
    document.getElementById('l-btn-supp').innerText = t.supp_b;
    
    document.getElementById('ref-title').innerText = t.ref_title;
    document.getElementById('ref-desc').innerText = t.ref_desc;
    document.getElementById('ref-btn-text').innerText = t.ref_btn;

    const container = document.getElementById('packages-container');
    container.innerHTML = t.plans.map(p => `
        <div class="package-item" ${p.n === 'ULTIMATE' ? 'style="border-color:var(--accent-blue)"' : ''}>
            <div class="package-header"><span class="package-name">${p.n}</span><span class="package-price">${p.p}</span></div>
            <div class="package-features">${p.f}</div>
        </div>
    `).join('');
}

// Функции навигации
function openRefs() { 
    document.getElementById('refs-screen').style.display = 'block';
    setActiveTab('tab-refs');
    tg.HapticFeedback.impactOccurred('medium');
}
function closeRefs() { 
    document.getElementById('refs-screen').style.display = 'none';
    setActiveTab('tab-home');
}
function setActiveTab(id) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function scrollToPlans() {
    closeRefs();
    document.getElementById('l-title-plans').scrollIntoView({ behavior: 'smooth' });
}

// Колесо Фортуны
const prizes = [{n:"0.1",c:"#121212"},{n:"0.5",c:"#1a1a1a"},{n:"1.0",c:"#007aff"},{n:"2.0",c:"#1a1a1a"},{n:"0.0",c:"#000"}];
function drawWheel() {
    const canvas = document.getElementById('wheel-canvas');
    const ctx = canvas.getContext('2d');
    const arc = (Math.PI * 2) / prizes.length;
    prizes.forEach((p, i) => {
        ctx.beginPath(); ctx.fillStyle = p.c; ctx.moveTo(300, 300);
        ctx.arc(300, 300, 300, i * arc, (i + 1) * arc); ctx.fill();
        ctx.save(); ctx.translate(300, 300); ctx.rotate(i * arc + arc/2);
        ctx.fillStyle="#fff"; ctx.font="900 40px Montserrat"; ctx.textAlign="right";
        ctx.fillText(p.n, 280, 10); ctx.restore();
    });
}

function runWheel() {
    const canvas = document.getElementById('wheel-canvas');
    const idx = Math.floor(Math.random() * prizes.length);
    const deg = 3600 + (idx * (360 / prizes.length));
    canvas.style.transform = `rotate(${deg}deg)`;
    tg.HapticFeedback.notificationOccurred('success');
    setTimeout(() => { tg.showAlert(`Вы выиграли ${prizes[prizes.length - 1 - idx].n} Stars!`); }, 4100);
}

function openGiftModal() { document.getElementById('gift-modal').style.display='flex'; drawWheel(); }
function closeGiftModal() { document.getElementById('gift-modal').style.display='none'; }

function sharePartnerLink() {
    const refLink = `https://t.me/beast_omni_bot?start=ref${tg.initDataUnsafe?.user?.id || 0}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent("Join Beast Omni!")}`;
    tg.openTelegramLink(url);
}

window.onload = () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity='0';
        setTimeout(() => splash.style.display='none', 500);
    }, 2500);
    
    if(tg.initDataUnsafe?.user) {
        document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name.toUpperCase();
    }
    changeLanguage('ru');
};
