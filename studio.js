// Ждем, пока весь HTML полностью загрузится в браузере
document.addEventListener('DOMContentLoaded', () => {
    
    // Получаем элементы
    const studioTrigger = document.getElementById('studio-trigger');
    const subToolsContainer = document.getElementById('studio-sub-tools');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const dynamicPanel = document.getElementById('dynamic-panel');
    const toolPanels = document.querySelectorAll('.tool-panel-content');
    const renderBtn = document.getElementById('render-btn');

    // Проверяем, есть ли на странице центральная кнопка Studio и панель инструментов
    if (studioTrigger && subToolsContainer) {
        
        // Клик по центральной кнопке Studio
        studioTrigger.addEventListener('click', () => {
            // Если панель скрыта — показываем её
            if (subToolsContainer.style.display === 'none' || subToolsContainer.style.display === '') {
                subToolsContainer.style.display = 'flex';
                studioTrigger.classList.add('active');
            } else {
                // Если открыта — закрываем всё
                subToolsContainer.style.display = 'none';
                if (dynamicPanel) dynamicPanel.classList.remove('active');
                studioTrigger.classList.remove('active');
                toolButtons.forEach(btn => btn.classList.remove('active'));
            }
        });
    }

    // Логика переключения вкладок (Формат, Текст, Звук, Экспорт)
    if (toolButtons.length > 0 && dynamicPanel) {
        toolButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);

                // Если панель уже открыта — закрываем её
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                    dynamicPanel.classList.remove('active');
                    if (targetPanel) targetPanel.classList.remove('active');
                    return;
                }

                // Сбрасываем активность со всех кнопок и панелей
                toolButtons.forEach(btn => btn.classList.remove('active'));
                toolPanels.forEach(panel => panel.classList.remove('active'));

                // Активируем нужную вкладку
                button.classList.add('active');
                dynamicPanel.classList.add('active');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Логика для кнопки рендера видео
    if (renderBtn) {
        renderBtn.addEventListener('click', () => {
            renderBtn.disabled = true;
            renderBtn.innerText = "⏳ СБОРКА ВИДЕО...";
            renderBtn.style.backgroundColor = "#2C2C2E";
            renderBtn.style.color = "#8E8E93";

            setTimeout(() => {
                alert("Видео успешно смонтировано!");
                renderBtn.disabled = false;
                renderBtn.innerText = "ГЕНЕРИРОВАТЬ ВИДЕО";
                renderBtn.style.backgroundColor = "#00F0FF";
                renderBtn.style.color = "#000000";
            }, 2000);
        });
    }
});
