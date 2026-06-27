document.addEventListener('DOMContentLoaded', () => {
    const shopCards = document.querySelectorAll('.shop-card');
    const modal = document.getElementById('voiceModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Элементы внутри модалки
    const modalVoiceName = document.getElementById('modalVoiceName');
    const modalPrice = document.getElementById('modalPrice');
    const playBtn = document.getElementById('playBtn');
    const previewAudio = document.getElementById('previewAudio');

    // Нажимаем на карточку — открывается модалка
    shopCards.forEach(card => {
        card.addEventListener('click', () => {
            const voiceName = card.querySelector('.card-name').innerText;
            const price = card.getAttribute('data-stars');
            // Тут укажи путь к аудиофайлу демо-голоса (можно зашить в data-audio у карточки)
            const audioSrc = card.getAttribute('data-audio') || 'audio/demo.mp3'; 

            modalVoiceName.innerText = `Голос: ${voiceName}`;
            modalPrice.innerText = price;
            previewAudio.src = audioSrc;
            
            // Сбрасываем кнопку плея
            playBtn.innerText = '▶ Слушать демо';

            modal.classList.add('active');
        });
    });

    // Закрытие модалки
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        previewAudio.pause(); // Стопаем звук при закрытии
    });

    // Логика кнопки Плей
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывали лишние клики
        if (previewAudio.paused) {
            previewAudio.play();
            playBtn.innerText = '⏸ Пауза';
        } else {
            previewAudio.pause();
            playBtn.innerText = '▶ Слушать демо';
        }
    });

    // Когда аудио закончилось
    previewAudio.addEventListener('ended', () => {
        playBtn.innerText = '▶ Слушать демо';
    });
});
