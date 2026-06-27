document.addEventListener('DOMContentLoaded', () => {
    const shopCards = document.querySelectorAll('.shop-card');
    
    // Элементы модалки коинов
    const coinModal = document.getElementById('coinModal');
    const coinModalTitle = document.getElementById('coinModalTitle');
    const coinModalPrice = document.getElementById('coinModalPrice');

    // Элементы модалки голосов
    const voiceModal = document.getElementById('voiceModal');
    const voiceModalTitle = document.getElementById('voiceModalTitle');
    const voiceModalPrice = document.getElementById('voiceModalPrice');
    const playBtn = document.getElementById('playBtn');
    const previewAudio = document.getElementById('previewAudio');

    // Обработка кликов по карточкам
    shopCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-type') || 'coin'; // по дефолту коин
            const name = card.querySelector('.card-name').innerText;
            const price = card.getAttribute('data-stars') || "0";

            if (cardType === 'coin') {
                // ОТКРЫВАЕМ ОКНО КОИНОВ
                coinModalTitle.innerText = `Купить ${name}`;
                coinModalPrice.innerText = price;
                coinModal.classList.add('active');
            } else if (cardType === 'voice') {
                // ОТКРЫВАЕМ ОКНО ГОЛОСОВ
                voiceModalTitle.innerText = `Голос: ${name}`;
                voiceModalPrice.innerText = price;
                
                const audioSrc = card.getAttribute('data-audio') || 'audio/demo.mp3';
                previewAudio.src = audioSrc;
                playBtn.innerText = '▶ Слушать демо';
                
                voiceModal.classList.add('active');
            }
        });
    });

    // Управление плеером в модалке голоса
    if (playBtn && previewAudio) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // чтобы окно не закрывалось при клике на плей
            if (previewAudio.paused) {
                previewAudio.play();
                playBtn.innerText = '⏸ Пауза';
            } else {
                previewAudio.pause();
                playBtn.innerText = '▶ Слушать демо';
            }
        });

        previewAudio.addEventListener('ended', () => {
            playBtn.innerText = '▶ Слушать демо';
        });
    }

    // Закрытие окон при клике на темный фон вокруг них
    [coinModal, voiceModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    if (previewAudio) previewAudio.pause();
                }
            });
        }
    });
});

// Глобальная функция для закрытия окон через крестик
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
    const audio = document.getElementById('previewAudio');
    if (audio) {
        audio.pause();
    }
}
