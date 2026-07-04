document.addEventListener('DOMContentLoaded', () => {
    // Безопасно ищем элементы на странице
    const cards = document.querySelectorAll('.inventory-card');
    const urlBox = document.getElementById('obsUrl');
    const copyBtn = document.getElementById('copyBtn');

    // ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ПЕРСОНАЖЕЙ
    if (cards.length > 0 && urlBox) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Снимаем активный класс со всех карточек
                cards.forEach(c => c.classList.remove('active-char'));
                
                // Добавляем класс текущей выбранной карточке
                card.classList.add('active-char');
                
                // Берем ID персонажа
                const charId = card.getAttribute('data-char-id') || 'default';
                
                // Обновляем ссылку в инпуте
                urlBox.innerText = `https://beastomni.com/stream/widget?token=user_flatow_777&char=${charId}`;
            });
        });
    }

    // ЛОГИКА КОПИРОВАНИЯ ССЫЛКИ
    if (copyBtn && urlBox) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = urlBox.innerText || urlBox.textContent;
            
            // Используем современный Clipboard API с фолбеком на случай старых браузеров
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        showCopyAlert();
                    })
                    .catch(err => {
                        console.error('Ошибка копирования через Clipboard API:', err);
                        fallbackCopyText(textToCopy);
                    });
            } else {
                // Старый проверенный способ, если Clipboard API не поддерживается в WebApp
                fallbackCopyText(textToCopy);
            }
        });
    }

    // Функция для вывода уведомления (чтобы не спамить стандартным alert)
    function showCopyAlert() {
        alert('Ссылка успешно скопирована! Вставьте её в OBS как Источник Браузера.');
    }

    // Запасной метод копирования для старых WebView внутри Telegram
    function fallbackCopyText(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Чтобы не дергался экран
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopyAlert();
            } else {
                alert('Не удалось скопировать ссылку. Выделите её вручную.');
            }
        } catch (err) {
            console.error('Фолбек тоже не сработал:', err);
        }
        document.body.removeChild(textArea);
    }
});
