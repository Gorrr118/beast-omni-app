document.addEventListener('DOMContentLoaded', () => {
    // === Инициализация базовых элементов плеера и загрузки ===
    const playerScreenTrigger = document.getElementById('player-screen-trigger');
    const videoUpload = document.getElementById('video-upload');
    const mainPlayer = document.getElementById('main-player');
    const placeholderText = document.getElementById('placeholder-text');
    const videoTrackName = document.getElementById('video-track-name');

    // === Элементы меню, инструментов и панелей ===
    const studioTrigger = document.getElementById('studio-trigger');
    const subToolsContainer = document.getElementById('studio-sub-tools');
    const toolButtons = document.querySelectorAll('.tool-btn');
    const dynamicPanel = document.getElementById('dynamic-panel');
    const toolPanels = document.querySelectorAll('.tool-panel-content');
    const renderBtn = document.getElementById('render-btn');

    // === Новые элементы из обновленного CSS ===
    const aiAvatar = document.getElementById('ai-avatar'); // Элемент .ai-avatar-overlay
    const resizeHandle = document.getElementById('avatar-resize-handle');
    const renderOverlay = document.getElementById('render-overlay');
    const progressFill = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-percentage');
    
    // Элементы Bottom Sheet (Магазин / Инвентарь)
    const inventoryBottomSheet = document.getElementById('inventory-bottom-sheet');
    const closeSheetBtn = document.getElementById('close-sheet-btn');
    const inventoryCards = document.querySelectorAll('.inventory-card');
    const openInventoryBtns = document.querySelectorAll('.inventory-trigger-btn'); // Кнопки вызова инвентаря

    // === 🎥 ЛОГИКА ЗАГРУЗКИ ВИДЕО ИЗ ГАЛЕРЕИ + API БЭКЕНДА ===
    if (playerScreenTrigger && videoUpload && mainPlayer && placeholderText) {
        playerScreenTrigger.addEventListener('click', (event) => {
            if (event.target === mainPlayer || event.target.closest('.ai-avatar-overlay')) return;
            videoUpload.click();
        });

        videoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                
                // Жестко скрываем плейсхолдер и показываем плеер
                placeholderText.style.setProperty('display', 'none', 'important');
                mainPlayer.style.setProperty('display', 'block', 'important');
                
                mainPlayer.src = videoURL;
                mainPlayer.load();
                mainPlayer.play().catch(err => {
                    console.log("Автовоспроизведение заблокировано браузером:", err);
                });

                if (videoTrackName) {
                    const shortName = file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name;
                    videoTrackName.innerText = `🎬 ${shortName}`;
                }

                // Отправка на Python бэкенд (FastAPI / server.py)
                const formData = new FormData();
                formData.append("file", file);

                console.log("Отправка видео на бэкенд...");
                fetch("http://127.0.0.1:8000/api/upload-video", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) console.log("Ответ от Python сервера:", data.message);
                    else console.error("Бэкенд вернул ошибку:", data.message);
                })
                .catch(error => {
                    console.error("Не удалось связаться с сервером. Проверь server.py:", error);
                });
            }
        });
    }

    // === 🤖 ИНТЕРАКТИВНЫЙ ИИ-АВАТАР: DRAG & DROP & RESIZE (Mouse + Touch) ===
    if (aiAvatar) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, startLeft, startTop, startWidth, startHeight;

        // --- Функция перемещения (Drag) ---
        aiAvatar.addEventListener('mousedown', startDrag);
        aiAvatar.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            if (e.target === resizeHandle) return; // Если кликнули на ресайзер — не двигаем
            e.preventDefault();
            
            isDragging = true;
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            
            startX = clientX;
            startY = clientY;
            startLeft = aiAvatar.offsetLeft;
            startTop = aiAvatar.offsetTop;

            document.addEventListener('mousemove', doDrag);
            document.addEventListener('touchmove', doDrag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }

        function doDrag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            // Ограничиваем перемещение границами плеера (родительского контейнера)
            const parent = aiAvatar.parentElement;
            let newLeft = startLeft + deltaX;
            let newTop = startTop + deltaY;

            newLeft = Math.max(0, Math.min(newLeft, parent.clientWidth - aiAvatar.clientWidth));
            newTop = Math.max(0, Math.min(newTop, parent.clientHeight - aiAvatar.clientHeight));

            aiAvatar.style.left = `${newLeft}px`;
            aiAvatar.style.top = `${newTop}px`;
        }

        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('touchmove', doDrag);
        }

        // --- Функция изменения размера (Resize) ---
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', startResize);
            resizeHandle.addEventListener('touchstart', startResize, { passive: false });
        }

        function startResize(e) {
            e.preventDefault();
            e.stopPropagation(); // Чтобы не сработало перемещение
            
            isResizing = true;
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            
            startX = clientX;
            startWidth = aiAvatar.clientWidth;
            startHeight = aiAvatar.clientHeight;

            document.addEventListener('mousemove', doResize);
            document.addEventListener('touchmove', doResize, { passive: false });
            document.addEventListener('mouseup', stopResize);
            document.addEventListener('touchend', stopResize);
        }

        function doResize(e) {
            if (!isResizing) return;
            e.preventDefault();
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            
            const deltaX = clientX - startX;
            // Сохраняем пропорции 1:1, так как аватар круглый
            let newSize = startWidth + deltaX; 
            
            // Задаем лимиты размера (от 50px до 200px)
            newSize = Math.max(50, Math.min(newSize, 200));

            aiAvatar.style.width = `${newSize}px`;
            aiAvatar.style.height = `${newSize}px`;
        }

        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('touchmove', doResize);
        }
    }

    // === ⚡ УПРАВЛЕНИЕ МЕНЮ STUDIO И ИНСТРУМЕНТАМИ ===
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
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    }

    // === 🛍️ ЛОГИКА BOTTOM SHEET (ИНВЕНТАРЬ И МАГАЗИН) ===
    function openBottomSheet() {
        if (inventoryBottomSheet) inventoryBottomSheet.classList.add('active');
    }

    function closeBottomSheet() {
        if (inventoryBottomSheet) inventoryBottomSheet.classList.remove('active');
    }

    if (openInventoryBtns.length > 0) {
        openInventoryBtns.forEach(btn => btn.addEventListener('click', openBottomSheet));
    }

    if (closeSheetBtn) {
        closeSheetBtn.addEventListener('click', closeBottomSheet);
    }

    // Клик по оверлею закрывает шторку
    const sheetOverlay = inventoryBottomSheet?.querySelector('.sheet-overlay');
    if (sheetOverlay) {
        sheetOverlay.addEventListener('click', closeBottomSheet);
    }

    // Выбор элементов внутри инвентаря
    inventoryCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('locked')) {
                alert("Этот премиум элемент закрыт. Разблокируйте его в магазине!");
                return;
            }
            // Убираем выделение у остальных карточек в этой же группе
            const siblings = card.parentElement.querySelectorAll('.inventory-card');
            siblings.forEach(c => c.classList.remove('selected'));
            
            card.classList.add('selected');

            // Пример динамического изменения аватарки на экране, если это блок аватаров
            const newAvatarSrc = card.querySelector('img')?.getAttribute('src');
            const targetAvatarImg = aiAvatar?.querySelector('img');
            if (newAvatarSrc && targetAvatarImg) {
                targetAvatarImg.src = newAvatarSrc;
            }
        });
    });

    // === 📐 ВЫБОР ФОРМАТА КАДРА (Интерактивные кнопки + Бэкенд + Динамический текст) ===
    const formatButtons = document.querySelectorAll('.format-btn');
    const formatDisplaySpan = document.getElementById('current-format-text'); // Сюда выводится текущий выбранный формат

    formatButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            formatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Безопасно вытаскиваем чистый формат (например, "16:9")
            const selectedFormat = btn.getAttribute('data-format') || btn.innerText.trim().split(' ')[0];
            console.log("Выбран формат:", selectedFormat);

            // Выводим текст выбранного формата в плашку/элемент интерфейса, если он есть на странице
            if (formatDisplaySpan) {
                formatDisplaySpan.innerText = selectedFormat;
            }

            // Динамическое добавление класса формата на главный плеер/контейнер
            if (mainPlayer) {
                mainPlayer.classList.remove('format-9-16', 'format-16-9', 'format-1-1', 'format-4-5');
                mainPlayer.classList.add(`format-${selectedFormat.replace(':', '-')}`);
            }

            // Отправка выбранного формата на FastAPI бэкенд
            fetch("http://127.0.0.1:8000/api/set-format", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ format: selectedFormat })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Ответ бэкенда по формату:", data);
            })
            .catch(error => {
                console.error("Не удалось отправить формат на сервер:", error);
            });
        });
    });

    // === 🚀 ПОЛНОЦЕННЫЙ ЭКРАН РЕНДЕРИНГА С ПРОГРЕСС-БАРОМ ===
    if (renderBtn && renderOverlay && progressFill && progressPercent) {
        renderBtn.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Показываем красивый оверлей сборки видео
            renderOverlay.style.display = 'flex';
            
            let progress = 0;
            progressFill.style.width = '0%';
            progressPercent.innerText = '0%';

            // Симуляция рендеринга (в продакшене тут будет Long Polling или WebSockets к FastAPI)
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 12) + 5; // Случайный шаг
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    setTimeout(() => {
                        renderOverlay.style.display = 'none';
                        alert("🎉 Видео успешно сгенерировано и сохранено в галерею!");
                    }, 500);
                }
                
                progressFill.style.width = `${progress}%`;
                progressPercent.innerText = `${progress}%`;
            }, 300);
        });
    }
});
