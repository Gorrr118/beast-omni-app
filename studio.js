const studioTrigger = document.getElementById('studio-trigger');
const subToolsContainer = document.getElementById('studio-sub-tools');
const toolButtons = document.querySelectorAll('.tool-btn');
const dynamicPanel = document.getElementById('dynamic-panel');
const toolPanels = document.querySelectorAll('.tool-panel-content');

// Клик по центральной кнопке Studio — скрывает/показывает панель инструментов
studioTrigger.addEventListener('click', () => {
    if (subToolsContainer.style.display === 'none') {
        subToolsContainer.style.display = 'flex';
        studioTrigger.classList.add('active');
    } else {
        subToolsContainer.style.display = 'none';
        dynamicPanel.classList.remove('active');
        studioTrigger.classList.remove('active');
        toolButtons.forEach(btn => btn.classList.remove('active'));
    }
});

// Клик по быстрым инструментам (Формат, Текст, Звук, Экспорт)
toolButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        // Если инструмент уже нажат — закрываем панель настроек
        if (button.classList.contains('active')) {
            button.classList.remove('active');
            dynamicPanel.classList.remove('active');
            return;
        }

        // Сбрасываем активные классы
        toolButtons.forEach(btn => btn.classList.remove('active'));
        toolPanels.forEach(panel => panel.classList.remove('active'));

        // Активируем выбранный инструмент и открываем его панель настроек
        button.classList.add('active');
        dynamicPanel.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

// Логика кнопки рендера
document.getElementById('render-btn').addEventListener('click', () => {
    const btn = document.getElementById('render-btn');
    btn.disabled = true;
    btn.innerText = "⏳ СБОРКА ВИДЕО...";
    btn.style.backgroundColor = "#2C2C2E";
    btn.style.color = "#8E8E93";

    setTimeout(() => {
        alert("Видео успешно смонтировано!");
        btn.disabled = false;
        btn.innerText = "ГЕНЕРИРОВАТЬ ВИДЕО";
        btn.style.backgroundColor = "#00F0FF";
        btn.style.color = "#000000";
    }, 2000);
});


