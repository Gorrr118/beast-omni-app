document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('video-file-input');
    const fontPicker = document.getElementById('studio-font-picker');
    const previewTarget = document.getElementById('text-preview-target');
    const launchBtn = document.getElementById('start-process-btn');

    // ==================== 1. ЛОГИКА ВЫБОРА ШРИФТА ====================
    fontPicker.addEventListener('change', (e) => {
        // Сбрасываем текущий класс и ставим тот, который выбрали в <option value="...">
        previewTarget.className = e.target.value;
    });

    // ==================== 2. КЛИК И ПЕРЕТАСКИВАНИЕ ФАЙЛА ====================
    // Клик по дропзоне открывает системное окно выбора файла
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    // Изменение инпута, когда файл выбран через окно
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleVideoSelect(e.target.files[0]);
        }
    });

    // Эффекты при перетаскивании файла над дропзоной
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
        }, false);
    });

    // Логика, когда файл сбросили в дропзону мышкой
    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type.startsWith('video/')) {
            fileInput.files = files; // Привязываем файл к нашему инпуту
            handleVideoSelect(files[0]);
        } else {
            alert('Бро, закинь именно видеофайл (MP4 или MOV)!');
        }
    });

    // Отображение имени выбранного файла
    function handleVideoSelect(file) {
        const titleElement = dropzone.querySelector('.dropzone-title');
        const infoElement = dropzone.querySelector('.dropzone-info');
        const iconElement = dropzone.querySelector('.dropzone-icon');

        iconElement.innerHTML = '🎬';
        titleElement.textContent = `Файл готов: ${file.name}`;
        // Переводим байты в мегабайты
        const fileSizeMb = (file.size / (1024 * 1024)).toFixed(1);
        infoElement.textContent = `Размер: ${fileSizeMb} MB`;
    }

    // ==================== 3. ЭМУЛЯЦИЯ ЗАПУСКА ОБРАБОТКИ ====================
    launchBtn.addEventListener('click', () => {
        // Проверяем, выбрал ли юзер файл
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Сначала загрузи видео, брат!');
            return;
        }

        // Анимация отправки на сервер (имитация)
        launchBtn.disabled = true;
        launchBtn.style.opacity = '0.7';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            launchBtn.querySelector('span').textContent = `⏳ ОБРАБОТКА AI... ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                launchBtn.querySelector('span').textContent = '✅ ВИДЕО ГОТОВО!';
                launchBtn.style.background = 'linear-gradient(135deg, #00e5ff 0%, #22c55e 100%)';
                launchBtn.style.boxShadow = '0 6px 20px rgba(0, 229, 255, 0.3)';
                
                setTimeout(() => {
                    alert('Магия сработала! Видео успешно переведено и оформлено.');
                    // Возвращаем кнопку в исходное состояние
                    launchBtn.disabled = false;
                    launchBtn.style.opacity = '1';
                    launchBtn.style.background = 'linear-gradient(135deg, #a855f7 0%, #ff007f 100%)';
                    launchBtn.style.boxShadow = '0 6px 20px rgba(255, 0, 127, 0.25)';
                    launchBtn.querySelector('span').textContent = '✨ НАЧАТЬ ОБРАБОТКУ ВИДЕО';
                }, 1000);
            }
        }, 400); // Раз в 400мс прибавляем проценты
    });
});