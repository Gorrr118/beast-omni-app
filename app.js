// index.js — Мозг главной страницы
let tg = window.Telegram.WebApp;

// Инициализация
tg.expand();
tg.ready();

// 1. Приветствие пользователя
const user = tg.initDataUnsafe?.user;
const userNameElement = document.getElementById('user-name');

if (user && userNameElement) {
    userNameElement.innerText = user.first_name.toUpperCase(); // Делаем капсом для стиля Beast
} else if (userNameElement) {
    userNameElement.innerText = "BEAST CORE";
}

// 2. Логика Сплэш-скрина (Исчезновение после загрузки)
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.style.display = 'none';
            }, 500);
        }, 2000); // Держим лого 2 секунды для солидности
    }
});

// 3. Выбор языка (Заглушка)
function changeLanguage(lang) {
    tg.HapticFeedback.impactOccurred('medium'); // Вибрация при выборе
    console.log("Язык изменен на:", lang);
    // Тут потом добавим реальную смену текста
}

/**
 * Функция для кнопок на главной
 */
function sendAction(action) {
    tg.HapticFeedback.notificationOccurred('success'); // Легкая вибрация
    const data = JSON.stringify({ "action": action });
    tg.sendData(data);
}

console.log("Beast Index Loaded");
