const navItems = document.querySelectorAll('.nav-item');
const dynamicPanel = document.getElementById('dynamic-panel');
const toolPanels = document.querySelectorAll('.tool-panel-content');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');

        // Если нажали на уже активную вкладку — закрываем панель совсем
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            dynamicPanel.classList.remove('active');
            return;
        }

        // Убираем активный класс у всех кнопок меню
        navItems.forEach(nav => nav.classList.remove('active'));
        // Скрываем все панели настроек
        toolPanels.forEach(panel => panel.classList.remove('active'));

        // Активируем текущую кнопку меню
        item.classList.add('active');
        // Показываем главную плашку настроек
        dynamicPanel.classList.add('active');
        // Показываем конкретную панель настроек
        document.getElementById(targetId).classList.add('active');
    });
});

// Логика кнопки РЕНДЕРА (Создать видео)
document.getElementById('render-btn').addEventListener('click', () => {
    const format = document.getElementById('video-format').value;
    const text = document.getElementById('subtitles-text').value;
    const font = document.getElementById('font-style').value;
    const volume = document.getElementById('music-volume').value;

    const btn = document.getElementById('render-btn');
    btn.disabled = true;
    btn.innerText = "⏳ СОЗДАНИЕ ВИДЕО...";
    btn.style.backgroundColor = "#555";

    setTimeout(() => {
        alert(`Видео готово!\nФормат: ${format}\nТекст: ${text}\nГромкость: ${volume}%`);
        btn.disabled = false;
        btn.innerText = "СОЗДАТЬ ВИДЕО";
        btn.style.backgroundColor = "#00F0FF";
    }, 2500);
});
