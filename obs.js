document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.inventory-card');
    const urlBox = document.getElementById('obsUrl');
    const copyBtn = document.getElementById('copyBtn');

    // Клик по карточкам персонажей
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active-char'));
            card.classList.add('active-char');
            
            const charId = card.getAttribute('data-char-id');
            urlBox.innerText = `https://beastomni.com/stream/widget?token=user_flatow_777&char=${charId}`;
        });
    });

    // Клик по кнопке копирования
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const text = urlBox.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('Ссылка скопирована!');
            }).catch(err => {
                console.error('Ошибка копирования:', err);
            });
        });
    }
});
