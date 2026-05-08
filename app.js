document.addEventListener('DOMContentLoaded', function() {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // 1. Приветствие
    const user = tg.initDataUnsafe?.user;
    if (user) {
        document.getElementById('user-name').innerText = user.first_name.toUpperCase();
    }

    // 2. БАЗА ТЕКСТОВ (ПЕРЕВОД)
    const content = {
        ru: {
            title_p: "ЭКОСИСТЕМА BEAST OMNI",
            desc_p: "Это твой <strong>ультимативный штаб</strong> для работы с контентом. Мы интегрировали передовые нейронные сети для мгновенного клонирования голоса, перевода видео и генерации уникальных аватаров. Властвуй над медиа-пространством в один клик.",
            title_s: "БЕЗОПАСНОСТЬ ELITE",
            desc_s: "Все ваши данные шифруются по протоколу <strong>AES-256</strong>. Мы не храним исходники после обработки. Ваша конфиденциальность — наш приоритет номер один в цифровом мире.",
            title_pay: "ГИБКАЯ ОПЛАТА",
            desc_pay: "Пополняй баланс через <strong>Telegram Stars</strong> или крипту. Быстрые транзакции, мгновенный доступ к мощностям серверов и прозрачная история всех твоих операций."
        }
    };

    // Вставляем тексты (используем INNERHTML для жирности и цвета!)
    document.getElementById('l-title-project').innerHTML = content.ru.title_p;
    document.getElementById('l-desc-project').innerHTML = content.ru.desc_p;
    document.getElementById('l-title-sec').innerHTML = content.ru.title_s;
    document.getElementById('l-desc-sec').innerHTML = content.ru.desc_s;
    document.getElementById('l-title-pay').innerHTML = content.ru.title_pay;
    document.getElementById('l-desc-pay').innerHTML = content.ru.desc_pay;

    // Убираем сплэш
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 500);
    }, 2000);
});
