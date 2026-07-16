document.addEventListener('DOMContentLoaded', () => {
    // Элементы плеера и загрузки
    const playerScreenTrigger = document.getElementById('player-screen-trigger');
    const videoUpload = document.getElementById('video-upload');
    const mainPlayer = document.getElementById('main-player');
    const placeholderText = document.getElementById('placeholder-text');
    const videoTrackName = document.getElementById('video-track-name');

    // Элементы меню и инструментов
    const studioTrigger = document.getElementById('studio-trigger');
    const subToolsContainer = document.getElementById('studio-sub-tools');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const dynamicPanel = document.getElementById('dynamic-panel');
    const toolPanels = document.querySelectorAll('.tool-panel-content');
    const renderBtn = document.getElementById('render-btn');

    // 🎥 ЛОГИКА ЗАГРУЗКИ ВИДЕО ИЗ ГАЛЕРЕИ
    if (playerScreenTrigger && videoUpload && mainPlayer && placeholderText) {
        
        // Клик по черному экрану открывает галерею
        playerScreenTrigger.addEventListener('click', (event) => {
            // Если кликнули на само играющее видео (например, на кнопку паузы), 
            // не открываем галерею заново
            if (event.target === mainPlayer) return;
            
            videoUpload.click();
        });

        // Событие, когда пользователь выбрал файл в галерее
        videoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            
            if (file) {
                // Создаем временный URL-адрес для локального видеофайла
                const videoURL = URL.createObjectURL(file);
                
                // Скрываем текст-заглушку и показываем сам плеер
                placeholderText.style.display = 'none';
                mainPlayer.style.display = 'block';
                
                // Подставляем видео в src и запускаем
                mainPlayer.src = videoURL;
                mainPlayer.load();
                mainPlayer.play().catch(err => {
                    console.log("Автовоспроизведение заблокировано браузером, нужен ручной клик:", err);
                });

                // Бонус: пишем имя загруженного файла на дорожку таймлайна!
                if (videoTrackName) {
                    // Обрезаем слишком длинные имена файлов для красоты
                    const shortName = file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name;
                    videoTrackName.innerText = `🎬 ${shortName}`;
                }
            }
        });
    }

    // ⚡ ЛОГИКА ДЛЯ ЦЕНТРАЛЬНОЙ КНОПКИ STUDIO
    if (studioTrigger && subToolsContainer) {
        studioTrigger.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            if (subToolsContainer.style.display === 'none' || subToolsContainer.style.display === '') {
                subToolsContainer.style.display = 'flex';
                studioTrigger.classList.add('active');
            } else {
                subToolsContainer.style.display = 'none';
                if (dynamicPanel) dynamicPanel.classList.remove('active');
                studioTrigger.classList.remove('active');
                toolButtons.forEach(btn => btn.classList.remove('active'));
            }
        });
    }

    // 🛠 ЛОГИКА ДЛЯ ИНСТРУМЕНТОВ (Формат, Текст, Звук, Экспорт)
    if (toolButtons.length > 0 && dynamicPanel) {
        toolButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                
                const targetId = button.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);

                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                    dynamicPanel.classList.remove('active');
                    if (targetPanel) targetPanel.classList.remove('active');
                    return;
                }

                toolButtons.forEach(btn => btn.classList.remove('active'));
                toolPanels.forEach(panel => panel.classList.remove('active'));

                button.classList.add('active');
                dynamicPanel.classList.add('active');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // 🚀 ЛОГИКА КНОПКИ ГЕНЕРАЦИИ (РЕНДЕРА)
    if (renderBtn) {
        renderBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
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
