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
    let currentSelectedColor = '#ffffff';

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

    // === 🛍️ РЕНДЕР КОНТЕНТА BOTTOM SHEET (Шрифты, Цвета, Голоса и Игровые Звуки) ===
    function renderBottomSheetContent(shopType, activeVoiceCategory = 'male') {
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
                            <span style="color: #777; cursor: pointer; white-space: nowrap;">Анимации</span>
                        </div>
                        <button id="goto-color-picker-btn" style="background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 12px; border-radius: 12px; font-size: 11px; cursor: pointer; white-space: nowrap; flex-shrink: 0;">🎨 Цвет</button>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; box-sizing: border-box;">
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
            
            // Наборы элементов для каждой категории
            const itemsData = {
                male: [
                    { name: 'Голос — Мужчина (Бас)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                    { name: 'Голос — Мужчина (Энергичный)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
                ],
                female: [
                    { name: 'Голос — Женщина (Мягкий)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
                    { name: 'Голос — Женщина (Яркий)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
                ],
                kids: [
                    { name: 'Голос — Ребенок (Веселый)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
                ],
                gta: [
                    { name: 'Звук — Франклин (GTA Фраза)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
                    { name: 'Звук — Зомби (Крик)', sample: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' }
                ]
            };

            const currentItems = itemsData[activeVoiceCategory] || itemsData.male;

            inventoryContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; padding: 0 4px 20px 4px; box-sizing: border-box;">
                    <!-- Верхнее меню разделов -->
                    <div style="display: flex; align-items: center; gap: 12px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid #2a2a2e; padding-bottom: 12px; width: 100%; box-sizing: border-box;">
                        <span class="voice-cat-tab ${activeVoiceCategory === 'male' ? 'active-tab' : ''}" data-cat="male" style="color: ${activeVoiceCategory === 'male' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'male' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'male' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">👨 Мужские</span>
                        <span class="voice-cat-tab ${activeVoiceCategory === 'female' ? 'active-tab' : ''}" data-cat="female" style="color: ${activeVoiceCategory === 'female' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'female' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'female' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">👩 Женские</span>
                        <span class="voice-cat-tab ${activeVoiceCategory === 'kids' ? 'active-tab' : ''}" data-cat="kids" style="color: ${activeVoiceCategory === 'kids' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'kids' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'kids' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">👶 Детские</span>
                        <span class="voice-cat-tab ${activeVoiceCategory === 'gta' ? 'active-tab' : ''}" data-cat="gta" style="color: ${activeVoiceCategory === 'gta' ? '#00e5ff' : '#777'}; font-weight: ${activeVoiceCategory === 'gta' ? 'bold' : 'normal'}; border-bottom: ${activeVoiceCategory === 'gta' ? '2px solid #00e5ff' : 'none'}; padding-bottom: 4px; cursor: pointer; white-space: nowrap; font-size: 13px;">🎮 Игровые звуки (GTA / Зомби)</span>
                    </div>

                    <!-- Красивые неоновые карточки (без кнопок, кликабельные) -->
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

            // Обработка кликов по вкладкам категорий
            const tabs = inventoryContainer.querySelectorAll('.voice-cat-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const cat = tab.getAttribute('data-cat');
                    renderBottomSheetContent('voices', cat);
                });
            });

            // Обработка кликов по неоновым карточкам (открытие мини-окна прослушивания)
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
        // Создаем или находим модальное мини-окно поверх инвентаря
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
        const modal = document.getElementById('voice-preview-modal');
        if (modal) modal.remove();
    }

    if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeBottomSheet);
    if (sheetOverlayClose) sheetOverlayClose.addEventListener('click', closeBottomSheet);

    if (openInventoryBtns.length > 0) {
        openInventoryBtns.forEach(triggerBtn => {
            triggerBtn.addEventListener('click', () => {
                const shopType = triggerBtn.getAttribute('data-shop-type') || 'fonts';
                openBottomSheet(shopType);
            });
        });
    }

    // Делегирование событий для карточек шрифтов
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
        });
    }

    // === 📐 ВЫБОР ФОРМАТА КАДРА ===
    const formatButtons = document.querySelectorAll('.format-btn');
    const formatDisplaySpan = document.getElementById('current-format-text');

    if (formatButtons.length > 0) {
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
    }
    
    // 🛠️ GIT SYNC MARKER (Версия от 2026.09.21 - Voices & Sounds Update)
});
