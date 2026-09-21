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
    const aiAvatar = document.getElementById('ai-avatar');
    const resizeHandle = document.getElementById('avatar-resize-handle');
    const renderOverlay = document.getElementById('render-status-screen');
    const progressFill = document.getElementById('progress-bar-fill');
    const progressPercent = document.getElementById('progress-pct');
    
    // Элементы Bottom Sheet (Магазин / Инвентарь)
    const inventoryBottomSheet = document.getElementById('shop-inventory-sheet');
    const closeSheetBtn = document.getElementById('sheet-close-x');
    const sheetOverlayClose = document.getElementById('sheet-overlay-close');
    const openInventoryBtns = document.querySelectorAll('.inventory-trigger-btn');
    const inventoryContainer = document.getElementById('inventory-items-container');
    const sheetTitle = document.getElementById('sheet-title');

    let hideControlsTimeout = null;
    let activePreviewAudio = null;
    let currentSelectedColor = '#ffffff'; // Переменная для хранения текущего цвета текста

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
                
                placeholderText.style.setProperty('display', 'none', 'important');
                
                const uploadOverlay = placeholderText.parentElement;
                if (uploadOverlay && uploadOverlay !== mainPlayer) {
                    uploadOverlay.style.setProperty('display', 'none', 'important');
                }

                mainPlayer.style.setProperty('display', 'block', 'important');
                mainPlayer.style.setProperty('z-index', '5', 'important');
                
                mainPlayer.src = videoURL;
                mainPlayer.load();

                mainPlayer.onloadedmetadata = () => {
                    const width = mainPlayer.videoWidth;
                    const height = mainPlayer.videoHeight;
                    const formatButtons = document.querySelectorAll('.format-btn');
                    
                    let targetFormat = '16:9';
                    if (height > width) {
                        targetFormat = '9:16';
                    } else if (width === height) {
                        targetFormat = '1:1';
                    }

                    formatButtons.forEach(btn => {
                        const fmt = btn.getAttribute('data-ratio') || btn.innerText.trim();
                        if (fmt.includes(targetFormat)) {
                            btn.click();
                        }
                    });
                };

                mainPlayer.play().catch(err => {
                    console.log("Автовоспроизведение заблокировано браузером:", err);
                });

                if (videoTrackName) {
                    const shortName = file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name;
                    videoTrackName.innerText = `🎬 ${shortName}`;
                }

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

    // === ⏱️ СКРЫТИЕ КНОПОК ПЛЕЕРА ЧЕРЕЗ 3 СЕКУНДЫ НА ПАУЗЕ ===
    if (mainPlayer) {
        mainPlayer.addEventListener('pause', () => {
            clearTimeout(hideControlsTimeout);
            hideControlsTimeout = setTimeout(() => {
                if (mainPlayer.paused) {
                    mainPlayer.classList.add('paused-hidden');
                }
            }, 3000);
        });

        mainPlayer.addEventListener('play', () => {
            clearTimeout(hideControlsTimeout);
            mainPlayer.classList.remove('paused-hidden');
        });

        mainPlayer.addEventListener('click', () => {
            if (mainPlayer.paused) {
                clearTimeout(hideControlsTimeout);
                mainPlayer.classList.remove('paused-hidden');
                
                hideControlsTimeout = setTimeout(() => {
                    if (mainPlayer.paused) {
                        mainPlayer.classList.add('paused-hidden');
                    }
                }, 3000);
            }
        });
    }

    // === 🤖 ИНТЕРАКТИВНЫЙ ИИ-АВАТАР: DRAG & RESIZE (Mouse + Touch) ===
    if (aiAvatar) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, startLeft, startTop, startWidth;

        aiAvatar.addEventListener('mousedown', startDrag);
        aiAvatar.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            if (e.target === resizeHandle) return;
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

        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', startResize);
            resizeHandle.addEventListener('touchstart', startResize, { passive: false });
        }

        function startResize(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isResizing = true;
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            
            startX = clientX;
            startWidth = aiAvatar.clientWidth;

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
            let newSize = startWidth + deltaX; 
            
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

    // === 🛍️ РЕНДЕР КОНТЕНТА BOTTOM SHEET (В стиле CapCut без лишнего второго ряда) ===
    function renderBottomSheetContent(shopType) {
        if (!inventoryContainer) return;

        if (shopType === 'fonts') {
            if (sheetTitle) sheetTitle.textContent = 'Шрифты';
            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; padding-bottom: 20px;">
                    
                    <!-- Превью текста сверху -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <div style="background: #222225; border: 1px solid #333; padding: 8px 12px; border-radius: 8px; color: ${currentSelectedColor}; font-size: 14px; width: 100%; box-sizing: border-box;">Введите текст</div>
                    </div>

                    <!-- Главные вкладки + Кнопка «Цвет» прямо наверх -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; padding-bottom: 6px; font-size: 13px; overflow-x: auto; gap: 12px;">
                        <span style="color: #777; cursor: pointer; white-space: nowrap;">Шаблоны</span>
                        <span style="color: #fff; font-weight: bold; border-bottom: 2px solid #fff; padding-bottom: 4px; cursor: pointer; white-space: nowrap;">Шрифты</span>
                        <span style="color: #777; cursor: pointer; white-space: nowrap;">Стили</span>
                        <span style="color: #777; cursor: pointer; white-space: nowrap;">Эффекты</span>
                        <span style="color: #777; cursor: pointer; white-space: nowrap;">Анимации</span>
                        <button id="goto-color-picker-btn" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 11px; cursor: pointer; white-space: nowrap; flex-shrink: 0; margin-left: auto;">🎨 Цвет</button>
                    </div>

                    <!-- Подкатегории шрифтов (без строки с лупой) -->
                    <div style="display: flex; gap: 12px; overflow-x: auto; align-items: center; padding-bottom: 4px;">
                        <button style="background: transparent; border: none; color: #888; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">В тренде</button>
                        <button style="background: transparent; border: none; color: #fff; font-weight: bold; font-size: 13px; border-bottom: 2px solid #00e5ff; cursor: pointer; white-space: nowrap; flex-shrink: 0;">Русский</button>
                        <button style="background: transparent; border: none; color: #888; font-size: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">Классика</button>
                    </div>

                    <!-- Сетка карточек шрифтов -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 4px;">
                        
                        <div class="inventory-card trial-font-card active-font-card" data-font="system" style="background: #1c242c; border: 2px solid #00e5ff; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="font-size: 13px; color: #fff; font-weight: bold;">SYSTEM</span>
                        </div>

                        <div class="inventory-card trial-font-card" data-font="Roboto, sans-serif" style="background: #222225; border: 2px solid transparent; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="position: absolute; top: 4px; right: 6px; background: #00bcd4; color: #000; font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 4px;">PRO</span>
                            <span style="font-size: 13px; color: #fff; font-family: Roboto, sans-serif;">Roboto</span>
                        </div>

                        <div class="inventory-card trial-font-card" data-font="Georgia, serif" style="background: #222225; border: 2px solid transparent; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="position: absolute; top: 4px; right: 6px; background: #00bcd4; color: #000; font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 4px;">PRO</span>
                            <span style="font-size: 13px; color: #fff; font-family: Georgia, serif;">Georgia</span>
                        </div>

                        <div class="inventory-card trial-font-card" data-font="Impact, sans-serif" style="background: #222225; border: 2px solid transparent; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="position: absolute; top: 4px; right: 6px; background: #00bcd4; color: #000; font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 4px;">PRO</span>
                            <span style="font-size: 13px; color: #fff; font-family: Impact, sans-serif;">Impact</span>
                        </div>

                        <div class="inventory-card trial-font-card" data-font="'Courier New', monospace" style="background: #222225; border: 2px solid transparent; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="position: absolute; top: 4px; right: 6px; background: #00bcd4; color: #000; font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 4px;">PRO</span>
                            <span style="font-size: 13px; color: #fff; font-family: 'Courier New', monospace;">Code</span>
                        </div>

                        <div class="inventory-card trial-font-card" data-font="'Comic Sans MS', cursive" style="background: #222225; border: 2px solid transparent; border-radius: 10px; height: 56px; display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer;">
                            <span style="position: absolute; top: 4px; right: 6px; background: #00bcd4; color: #000; font-size: 9px; font-weight: bold; padding: 1px 4px; border-radius: 4px;">PRO</span>
                            <span style="font-size: 13px; color: #fff; font-family: 'Comic Sans MS', cursive;">Comic</span>
                        </div>

                    </div>
                </div>
            `;

            // Обработчик для кнопки перехода к цветам
            const colorBtn = document.getElementById('goto-color-picker-btn');
            if (colorBtn) {
                colorBtn.addEventListener('click', () => {
                    renderBottomSheetContent('color');
                });
            }

        } else if (shopType === 'color') {
            if (sheetTitle) sheetTitle.textContent = 'Выбор цвета текста';
            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; padding-bottom: 20px; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.06); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); width: 100%; justify-content: space-between; box-sizing: border-box;">
                        <span style="font-size: 13px; color: #fff;">Выберите цвет:</span>
                        <input type="color" id="text-color-picker" value="${currentSelectedColor}" style="width: 40px; height: 40px; border: none; background: none; cursor: pointer; border-radius: 50%;">
                    </div>
                    <button id="save-color-btn" style="width: 100%; padding: 12px; background: #00e5ff; color: #000; border: none; border-radius: 10px; font-weight: bold; font-size: 13px; cursor: pointer;">Применить цвет</button>
                </div>
            `;

            const colorPicker = document.getElementById('text-color-picker');
            if (colorPicker) {
                colorPicker.addEventListener('input', (e) => {
                    currentSelectedColor = e.target.value;
                });
            }

            const saveColorBtn = document.getElementById('save-color-btn');
            if (saveColorBtn) {
                saveColorBtn.addEventListener('click', () => {
                    if (videoTrackName) {
                        videoTrackName.style.color = currentSelectedColor;
                    }
                    closeBottomSheet();
                });
            }

        } else if (shopType === 'voices') {
            if (sheetTitle) sheetTitle.textContent = 'ИИ Голоса: Пробное прослушивание';
            inventoryContainer.innerHTML = `
                <div class="inventory-card voice-preview-card" style="display: flex; flex-direction: column; align-items: flex-start; padding: 15px; margin-bottom: 10px; background: rgba(255,255,255,0.03); border-radius: 12px;">
                    <div style="font-weight: bold; margin-bottom: 8px; color: #fff;">🎙️ Голос: Максим (Энергичный)</div>
                    <button class="btn-test-preview trial-voice-btn" data-sample="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3">▶ Прослушать пробный</button>
                </div>
                <div class="inventory-card voice-preview-card" style="display: flex; flex-direction: column; align-items: flex-start; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 12px;">
                    <div style="font-weight: bold; margin-bottom: 8px; color: #fff;">🎙️ Голос: София (Мягкий)</div>
                    <button class="btn-test-preview trial-voice-btn" data-sample="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3">▶ Прослушать пробный</button>
                </div>
            `;
        } else {
            if (sheetTitle) sheetTitle.textContent = 'ИИ Аватары';
            inventoryContainer.innerHTML = `
                <div class="inventory-card" style="display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 12px;">
                    <i class="fas fa-check-circle" style="color: #2ecc71; font-size: 20px; margin-bottom: 5px;"></i>
                    <div>Стандартный аватар</div>
                </div>
            `;
        }
    }

    function openBottomSheet(shopType) {
        if (inventoryBottomSheet) inventoryBottomSheet.classList.add('active');
        renderBottomSheetContent(shopType);
    }

    function closeBottomSheet() {
        if (inventoryBottomSheet) inventoryBottomSheet.classList.remove('active');
        if (activePreviewAudio) {
            activePreviewAudio.pause();
            activePreviewAudio = null;
        }
    }

    if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeBottomSheet);
    if (sheetOverlayClose) sheetOverlayClose.addEventListener('click', closeBottomSheet);

    openInventoryBtns.forEach(triggerBtn => {
        triggerBtn.addEventListener('click', () => {
            const shopType = triggerBtn.getAttribute('data-shop-type') || 'fonts';
            openBottomSheet(shopType);
        });
    });

    // Делегирование событий для карточек шрифтов и голосов
    if (inventoryContainer) {
        inventoryContainer.addEventListener('click', (e) => {
            const fontCard = e.target.closest('.trial-font-card');
            if (fontCard) {
                e.stopPropagation();
                
                const allCards = inventoryContainer.querySelectorAll('.trial-font-card');
                allCards.forEach(c => {
                    c.style.border = '2px solid transparent';
                    c.style.background = '#222225';
                });
                
                fontCard.style.border = '2px solid #00e5ff';
                fontCard.style.background = '#1c242c';

                const fontName = fontCard.getAttribute('data-font');
                if (videoTrackName) {
                    videoTrackName.style.fontFamily = fontName;
                }

                console.log("Выбран шрифт:", fontName);

                fetch("http://127.0.0.1:8000/api/preview-font", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ font: fontName })
                }).catch(err => console.log("Бэкенд превью шрифта недоступен:", err));
                return;
            }

            const voiceBtn = e.target.closest('.trial-voice-btn');
            if (voiceBtn) {
                e.stopPropagation();
                const sampleUrl = voiceBtn.getAttribute('data-sample');

                if (activePreviewAudio) {
                    activePreviewAudio.pause();
                    activePreviewAudio = null;
                    voiceBtn.textContent = "▶ Прослушать пробный";
                } else {
                    activePreviewAudio = new Audio(sampleUrl);
                    voiceBtn.textContent = "⏸ Остановить";
                    
                    activePreviewAudio.play().catch(err => {
                        console.error("Ошибка воспроизведения семпла:", err);
                    });

                    activePreviewAudio.onended = () => {
                        voiceBtn.textContent = "▶ Прослушать пробный";
                        activePreviewAudio = null;
                    };
                }
            }
        });
    }

    // === 📐 ВЫБОР ФОРМАТА КАДРА ===
    const formatButtons = document.querySelectorAll('.format-btn');
    const formatDisplaySpan = document.getElementById('current-format-text');

    formatButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            formatButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (formatDisplaySpan) {
                formatDisplaySpan.textContent = btn.innerText;
            }
        });
    });
});
