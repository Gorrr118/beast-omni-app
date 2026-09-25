document.addEventListener('DOMContentLoaded', () => {
    // === Константы ===
    const API_BASE_URL = 'http://127.0.0.1:8000';

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

    // === Новые элементы из обновленного CSS ===
    const aiAvatar = document.getElementById('ai-avatar');
    const resizeHandle = document.getElementById('avatar-resize-handle');
    
    // Элементы Bottom Sheet (Магазин / Инвентарь)
    const inventoryBottomSheet = document.getElementById('shop-inventory-sheet');
    const closeSheetBtn = document.getElementById('sheet-close-x');
    const sheetOverlayClose = document.getElementById('sheet-overlay-close');
    const openInventoryBtns = document.querySelectorAll('.inventory-trigger-btn');
    const inventoryContainer = document.getElementById('inventory-items-container');
    const sheetTitle = document.getElementById('sheet-title');

    let hideControlsTimeout = null;
    let activePreviewAudio = null;
    let currentSelectedColor = '#ffffff';

    // === Функции управления Bottom Sheet ===
    function openBottomSheet(shopType) {
        if (!inventoryBottomSheet) return;
        renderBottomSheetContent(shopType);
        inventoryBottomSheet.classList.add('active');
    }

    function closeBottomSheet() {
        if (!inventoryBottomSheet) return;
        inventoryBottomSheet.classList.remove('active');
        if (activePreviewAudio) {
            activePreviewAudio.pause();
            activePreviewAudio = null;
        }
        const modal = document.getElementById('voice-preview-modal');
        if (modal) modal.remove();
    }

    // === 🎥 ЛОГИКА ЗАГРУЗКИ ВИДЕО ИЗ ГАЛЕРЕИ + API БЭКЕНДА ===
    if (playerScreenTrigger && videoUpload && mainPlayer && placeholderText) {
        playerScreenTrigger.addEventListener('click', (event) => {
            if (event.target === mainPlayer || event.target.closest('.ai-avatar-overlay')) return;
            videoUpload.click();
        });

        videoUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                if (mainPlayer.src && mainPlayer.src.startsWith('blob:')) {
                    URL.revokeObjectURL(mainPlayer.src);
                }

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
                fetch(`${API_BASE_URL}/api/upload-video`, {
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

    // === 🤖 ИНТЕРАКТИВНЫЙ ИИ-АВАТАР: DRAG & RESIZE ===
    if (aiAvatar) {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, startLeft, startTop, startWidth;

        aiAvatar.addEventListener('mousedown', startDrag);
        aiAvatar.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            if (resizeHandle && e.target === resizeHandle) return;
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
            if (!parent) return;
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
                toolPanels.forEach(panel => panel.classList.remove('active'));
            }
        });
    }

    if (toolButtons.length > 0 && dynamicPanel) {
        toolButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = button.getAttribute('data-target');
                const targetPanel = targetId ? document.getElementById(targetId) : null;

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

    // === 🛍️ ПРИВЯЗКА КНОПОК ОТКРЫТИЯ BOTTOM SHEET (МАГАЗИН / ИНВЕНТАРЬ) ===
    if (openInventoryBtns.length > 0) {
        openInventoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const shopType = btn.getAttribute('data-shop-type') || 'fonts';
                openBottomSheet(shopType);
            });
        });
    }

    if (closeSheetBtn) {
        closeSheetBtn.addEventListener('click', closeBottomSheet);
    }

    if (sheetOverlayClose) {
        sheetOverlayClose.addEventListener('click', closeBottomSheet);
    }

    // === 🏷️ МОДУЛЬ АВТОМАТИЧЕСКОЙ ГЕНЕРАЦИИ ХЭШТЕГОВ (ПЛОТ / ТЕМА) ===
    function initHashtagGenerator() {
        const hashtagGenContainer = document.getElementById('hashtag-generator-container');
        if (!hashtagGenContainer) return;

        hashtagGenContainer.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; box-sizing: border-box; padding: 10px;">
                <h3 style="color: #00e5ff; font-size: 14px; margin: 0;">🤖 Генератор хэштегов по сюжету</h3>
                <textarea id="plot-input" placeholder="Введите краткое описание сюжета или темы видео..." style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; color: #fff; padding: 10px; font-size: 12px; resize: none; height: 70px; outline: none;"></textarea>
                <button id="generate-tags-btn" style="background: #00e5ff; color: #000; border: none; border-radius: 8px; padding: 10px; font-weight: bold; font-size: 12px; cursor: pointer;">Сгенерировать хэштеги</button>
                <div id="tags-output-area" style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 10px; min-height: 40px; color: #ddd; font-size: 12px; word-break: break-all;"></div>
            </div>
        `;

        const generateBtn = document.getElementById('generate-tags-btn');
        const plotInput = document.getElementById('plot-input');
        const tagsOutput = document.getElementById('tags-output-area');

        if (generateBtn && plotInput && tagsOutput) {
            generateBtn.addEventListener('click', () => {
                const plotSummary = plotInput.value.trim();
                if (!plotSummary) {
                    tagsOutput.innerHTML = '<span style="color: #ff5252;">Пожалуйста, введите сюжет или тему!</span>';
                    return;
                }

                tagsOutput.innerHTML = 'Генерация хэштегов...';

                fetch(`${API_BASE_URL}/api/generate-hashtags`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ summary: plotSummary })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.tags && Array.isArray(data.tags)) {
                        tagsOutput.innerHTML = data.tags.map(tag => `<span style="display: inline-block; background: rgba(0,229,255,0.15); color: #00e5ff; padding: 3px 8px; border-radius: 6px; margin: 2px; font-size: 11px;">#${tag}</span>`).join('');
                    } else {
                        generateFallbackTags(plotSummary, tagsOutput);
                    }
                })
                .catch(err => {
                    console.warn("Бэкенд недоступен, используем локальный генератор хэштегов:", err);
                    generateFallbackTags(plotSummary, tagsOutput);
                });
            });
        }
    }

    function generateFallbackTags(summary, outputContainer) {
        const words = summary.toLowerCase().replace(/[^\w\sа-яё]/gi, '').split(/\s+/);
        const uniqueWords = [...new Set(words)].filter(w => w.length > 3);
        const generated = uniqueWords.slice(0, 6);
        
        if (generated.length === 0) {
            outputContainer.innerHTML = '<span style="color: #aaa;">#видео #тренд #рекомендации #content</span>';
            return;
        }

        outputContainer.innerHTML = generated.map(w => `<span style="display: inline-block; background: rgba(0,229,255,0.15); color: #00e5ff; padding: 3px 8px; border-radius: 6px; margin: 2px; font-size: 11px;">#${w}</span>`).join('') + ' <span style="display: inline-block; background: rgba(0,229,255,0.15); color: #00e5ff; padding: 3px 8px; border-radius: 6px; margin: 2px; font-size: 11px;">#trending</span>';
    }

    initHashtagGenerator();

    // === 🛍️ РЕНДЕР КОНТЕНТА BOTTOM SHEET (Шрифты, Цвета, Голоса и Игры) ===
    function renderBottomSheetContent(shopType, activeVoiceCategory = 'humans') {
        if (!inventoryContainer) return;

        if (shopType === 'fonts') {
            if (sheetTitle) sheetTitle.textContent = 'Шрифты';
            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; padding: 0 4px 20px 4px; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2a2e; padding-bottom: 12px; font-size: 13px; width: 100%; box-sizing: border-box;">
                        <div style="display: flex; align-items: center; gap: 16px; overflow-x: auto; scrollbar-width: none; flex-grow: 1; padding-right: 10px;">
                            <span style="color: #777; cursor: pointer; white-space: nowrap;">Шаблоны</span>
                            <span style="color: #fff; font-weight: bold; border-bottom: 2px solid #00e5ff; padding-bottom: 4px; cursor: pointer; white-space: nowrap;">Шрифты</span>
                            <span style="color: #777; cursor: pointer; white-space: nowrap;">Стили</span>
                            <span style="color: #777; cursor: pointer; white-space: nowrap;">Эффекты</span>
                        </div>
                        <button id="goto-color-picker-btn" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 12px; border-radius: 12px; font-size: 11px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">🎨 Цвет</button>
                    </div>

                    <!-- Сетка шрифтов строго в 2 колонки -->
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; box-sizing: border-box;">
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

            const colorBtn = document.getElementById('goto-color-picker-btn');
            if (colorBtn) {
                colorBtn.addEventListener('click', () => {
                    renderBottomSheetContent('color');
                });
            }

            const fontCards = inventoryContainer.querySelectorAll('.trial-font-card');
            fontCards.forEach(card => {
                card.addEventListener('click', () => {
                    fontCards.forEach(c => {
                        c.classList.remove('active-font-card');
                        c.style.background = '#222225';
                        c.style.border = '2px solid transparent';
                    });

                    card.classList.add('active-font-card');
                    card.style.background = '#1c242c';
                    card.style.border = '2px solid #00e5ff';

                    const selectedFont = card.getAttribute('data-font');
                    if (videoTrackName) {
                        videoTrackName.style.fontFamily = selectedFont === 'system' ? 'inherit' : selectedFont;
                    }
                });
            });

        } else if (shopType === 'color') {
            if (sheetTitle) sheetTitle.textContent = 'Выбор цвета текста';
            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; padding-bottom: 20px; align-items: center; box-sizing: border-box;">
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
            if (sheetTitle) sheetTitle.textContent = 'Выбор голосов и звуков';
            
            const itemsData = {
                humans: [
                    { name: 'Голос — Мужчина (Бас)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                    { name: 'Голос — Мужчина (Энергичный)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                    { name: 'Голос — Женщина (Мягкий)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
                    { name: 'Голос — Женщина (Яркий)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
                    { name: 'Голос — Ребенок (Веселый)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
                ],
                games: [
                    { name: 'Звук — Франклин (GTA Фраза)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
                    { name: 'Звук — Зомби (Крик)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
                ]
            };

            const currentItems = itemsData[activeVoiceCategory] || itemsData.humans;

            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; padding: 0 4px 20px 4px; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid #2a2a2e; padding-bottom: 12px; width: 100%; box-sizing: border-box;">
                        <span class="voice-cat-tab" data-cat="humans" style="color: ${activeVoiceCategory === 'humans' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'humans' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'humans' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">🗣️ Человеческие голоса</span>
                        <span class="voice-cat-tab" data-cat="games" style="color: ${activeVoiceCategory === 'games' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'games' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'games' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">🎮 Голоса из игр</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
                        ${currentItems.map(item => `
                            <div class="neon-voice-card" data-name="${item.name}" data-sample="${item.sample}" style="background: linear-gradient(135deg, rgba(0, 229, 255, 0.08), rgba(28, 36, 44, 0.9)); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 12px; padding: 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-shadow: 0 0 10px rgba(0, 229, 255, 0.15); transition: all 0.3s ease;">
                                <span style="font-size: 14px; color: #fff; font-weight: 500;">🎙️ ${item.name}</span>
                                <span style="font-size: 12px; color: #00e5ff; font-weight: bold;">Выбрать ▸</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            const tabs = inventoryContainer.querySelectorAll('.voice-cat-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const cat = tab.getAttribute('data-cat');
                    renderBottomSheetContent('voices', cat);
                });
            });

            const cards = inventoryContainer.querySelectorAll('.neon-voice-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const voiceName = card.getAttribute('data-name');
                    const sampleUrl = card.getAttribute('data-sample');
                    openVoicePreviewModal(voiceName, sampleUrl);
                });
            });

        } else {
            if (sheetTitle) sheetTitle.textContent = 'ИИ Аватары';
            inventoryContainer.innerHTML = `
                <div class="inventory-card" style="display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 12px; width: 100%; box-sizing: border-box;">
                    <i class="fas fa-check-circle" style="color: #2ecc71; font-size: 20px; margin-bottom: 5px;"></i>
                    <div>Стандартный аватар</div>
                </div>
            `;
        }
    }

    // === 🎵 МИНИ-ОКНО ДЛЯ ПРОСЛУШИВАНИЯ ГОЛОСА ===
    function openVoicePreviewModal(voiceName, sampleUrl) {
        let modal = document.getElementById('voice-preview-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'voice-preview-modal';
            modal.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 15, 18, 0.95); z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;";
            inventoryBottomSheet.appendChild(modal);
        }

        modal.innerHTML = `
            <div style="background: #1c242c; border: 2px solid #00e5ff; border-radius: 16px; padding: 24px; width: 90%; max-width: 320px; display: flex; flex-direction: column; align-items: center; gap: 16px; box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);">
                <div style="font-size: 15px; color: #fff; font-weight: bold; text-align: center;">🔊 ${voiceName}</div>
                <p style="font-size: 12px; color: #aaa; text-align: center; margin: 0;">Нажмите кнопку ниже, чтобы прослушать образец звука или голоса.</p>
                <button id="modal-play-btn" style="width: 100%; padding: 12px; background: #00e5ff; color: #000; border: none; border-radius: 10px; font-weight: bold; font-size: 13px; cursor: pointer; box-shadow: 0 0 10px rgba(0,229,255,0.5);">▶ Воспроизвести</button>
                <button id="modal-close-btn" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; font-size: 12px; cursor: pointer;">Назад к списку</button>
            </div>
        `;

        const playBtn = modal.querySelector('#modal-play-btn');
        const closeBtn = modal.querySelector('#modal-close-btn');

        playBtn.addEventListener('click', () => {
            if (activePreviewAudio) {
                activePreviewAudio.pause();
                activePreviewAudio = null;
                playBtn.textContent = "▶ Воспроизвести";
            } else {
                activePreviewAudio = new Audio(sampleUrl);
                playBtn.textContent = "⏸ Остановить";
                
                activePreviewAudio.play().catch(err => {
                    console.error("Ошибка воспроизведения аудио:", err);
                });

                activePreviewAudio.onended = () => {
                    playBtn.textContent = "▶ Воспроизвести";
                    activePreviewAudio = null;
                };
            }
        });

        closeBtn.addEventListener('click', () => {
            if (activePreviewAudio) {
                activePreviewAudio.pause();
                activePreviewAudio = null;
            }
            modal.remove();
        });
    }
});
