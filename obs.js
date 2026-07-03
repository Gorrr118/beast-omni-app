document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.inventory-card');
    const urlBox = document.getElementById('obsUrl');
    const copyBtn = document.getElementById('copyBtn');

    // Функция для переключения персонажей
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Удаляем класс активности у всех элементов
            cards.forEach(c => c.classList.remove('active-char'));
            
            // Добавляем класс текущей нажатой карточке
            card.classList.add('active-char');
            
            // Берем ID персонажа из data-атрибута
            const charId = card.getAttribute('data-char-id');
            
            // Обновляем секретную ссылку в интерфейсе
            urlBox.innerText = `https://beastomni.com/stream/widget?token=user_flatow_777&char=${charId}`;
        });
    });

    // Функция для копирования ссылки
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = urlBox.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Ссылка успешно скопирована! Вставьте её в ОБС как Источник Браузера.');
            }).catch(err => {
                console.error('Не удалось скопировать ссылку: ', err);
            });
        });
    }
});