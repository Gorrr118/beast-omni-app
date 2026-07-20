document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки покупки, так как теперь только они открывают окно
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    // Элементы универсального модального окна
    const modal = document.getElementById('universalModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalAudioBox = document.getElementById('modalAudioBox');
    const modalVisualPreview = document.getElementById('modalVisualPreview');
    const modalBuyBtn = document.getElementById('modalBuyBtn');
    const previewAudio = document.getElementById('previewAudio');
    const playBtn = document.getElementById('playBtn');

    // Обработка кликов строго по КНОПКАМ покупки
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Останавливаем всплытие, чтобы карточка не перехватывала клик
            e.stopPropagation();

            // Находим карточку, внутри которой лежит эта кнопка
            const card = button.closest('.shop-card');
            if (!card) return;

            const type = card.getAttribute('data-type') || 'coin';
            const name = card.getAttribute('data-name') || card.querySelector('.card-name').innerText;
            
            // Полный сброс состояния модалки перед открытием нового контента
            modalAudioBox.style.display = 'none';
            modalVisualPreview.innerHTML = '';
            if (previewAudio) {
                previewAudio.pause();
                previewAudio.src = '';
            }
            if (playBtn) {
                playBtn.innerText = '▶ Слушать демо голоса';
            }

            // 1. КАТЕГОРИЯ: КОИНЫ
            if (type === 'coin') {
                const price = card.getAttribute('data-price');
                modalTitle.innerText = name;
                modalBadge.innerText = 'ПОПОЛНЕНИЕ';
                modalVisualPreview.innerHTML = `<div class="modal-main-icon">🪙</div>`;
                modalBuyBtn.innerText = `Купить за ${price} ₽`;
            } 
            
            // 2. КАТЕГОРИЯ: ИИ-ГОЛОСА
            else if (type === 'voice') {
                const stars = card.getAttribute('data-stars') || "0";
                const audioSrc = card.getAttribute('data-audio') || 'audio/demo.mp3';
                
                modalTitle.innerText = `Голос: ${name}`;
                modalBadge.innerText = 'PREVIEW ГОЛОСА';
                modalAudioBox.style.display = 'block';
                
                if (previewAudio) previewAudio.src = audioSrc;
                modalBuyBtn.innerText = `Открыть за ⭐️ ${stars}`;
            } 
            
            // 3. КАТЕГОРИЯ: OBS ПЕРСОНАЖИ
            else if (type === 'avatar') {
                const stars = card.getAttribute('data-stars') || "0";
                const charPlaceholder = card.querySelector('.obs-char-placeholder');
                const innerEmoji = charPlaceholder ? charPlaceholder.innerHTML : '🎭';
                
                modalTitle.innerText = name;
                modalBadge.innerText = 'OBS ПЕРСОНАЖ';
                // Стили забираются из CSS классов .obs-preview-box и .obs-stream-text
                modalVisualPreview.innerHTML = `
                    <div class="obs-preview-box" style="max-width: 190px; margin: 0 auto 16px auto;">
                        <div class="obs-stream-text">[ОКНО СТРИМА ДЛЯ OBS]</div>
                        <div class="obs-char-placeholder" style="font-size: 40px;">${innerEmoji}</div>
                    </div>
                `;
                modalBuyBtn.innerText = `Открыть за ⭐️ ${stars}`;
            } 
            
            // 4. КАТЕГОРИЯ: ШРИФТЫ
            else if (type === 'font') {
                const stars = card.getAttribute('data-stars') || "0";
                const fontExample = card.querySelector('.font-example');
                const fontExampleClass = fontExample ? fontExample.className : 'font-example';
                
                modalTitle.innerText = name;
                modalBadge.innerText = 'ШРИФТ ВИДЖЕТА';
                // Стили подтягиваются из .font-preview-container
                modalVisualPreview.innerHTML = `
                    <div class="font-preview-container" style="max-width: 220px; margin: 0 auto 16px auto;">
                        <div class="${fontExampleClass}" style="font-size: 18px;">Beast Omni</div>
                        <div class="font-subtext" style="margin-top: 6px;">Пример отображения текста</div>
                    </div>
                `;
                modalBuyBtn.innerText = `Купить за ⭐️ ${stars}`;
            }

            // Показываем окно добавлением класса active
            if (modal) modal.classList.add('active');
        });
    });

    // Управление плеером внутри модалки
    if (playBtn && previewAudio) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы окно не закрывалось при клике на плей
            if (previewAudio.paused) {
                previewAudio.play().catch(err => console.log("Аудио еще не загрузилось:", err));
                playBtn.innerText = '⏸ Пауза';
            } else {
                previewAudio.pause();
                playBtn.innerText = '▶ Слушать демо голоса';
            }
        });

        previewAudio.addEventListener('ended', () => {
            playBtn.innerText = '▶ Слушать демо голоса';
        });
    }

    // Закрытие модалки при клике на темный фон вокруг неё
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Глобальная функция закрытия (включая фикс сброса текста кнопки плеера)
function closeModal() {
    const modal = document.getElementById('universalModal');
    if (modal) {
        modal.classList.remove('active');
    }
    const previewAudio = document.getElementById('previewAudio');
    if (previewAudio) {
        previewAudio.pause();
        previewAudio.currentTime = 0; // Сбрасываем трек на начало
    }
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.innerText = '▶ Слушать демо голоса'; // Возвращаем исходный текст при любом закрытии
    }
}
