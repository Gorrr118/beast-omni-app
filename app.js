// index.js - Полностью рабочий код без ошибок
document.addEventListener('DOMContentLoaded', function() {
    // 1. Инициализация Telegram
    const tg = window.Telegram.WebApp;
    
    if (tg) {
        tg.ready();
        tg.expand();

        // Безопасная установка имени
        const user = tg.initDataUnsafe?.user;
        const nameElement = document.getElementById('user-name');
        if (user && nameElement) {
            nameElement.innerText = user.first_name.toUpperCase();
        }
    }

    // 2. Логика скрытия сплэш-скрина
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Даем небольшую задержку для красоты
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500);
        }, 2000);
    }
});
