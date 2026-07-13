document.addEventListener('DOMContentLoaded', () => {
    // Подключаем Telegram WebApp API
    const tg = window.Telegram.WebApp;
    if (tg) {
        tg.expand(); // Расширяем приложение на весь экран телефона
    }

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('video-file-input');
    const fontPicker = document.getElementById('studio-font-picker');
    const previewTarget = document.getElementById('text-preview-target');
    const launchBtn = document.getElementById('start-process-btn');
    const targetLangSelect = document.getElementById('target-lang-select');
    const voiceCloningToggle = document.getElementById('voice-cloning-toggle');

    // ==================== 1. ЛОГИКА ВЫБОРА ШРИФТА ====================
    fontPicker.addEventListener('change', (e) => {
        previewTarget.className = e.target.value;
    });

    // ==================== 2. КЛИК И ПЕРЕТАСКИВАНИЕ ФАЙЛА ====================
    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleVideoSelect(e.target.files[0]);
        }
    });

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

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && files[0].type.startsWith('video/')) {
            fileInput.files = files;
            handleVideoSelect(files[0]);
        } else {
            alert('Бро, закинь именно видеофайл (MP4 или MOV)!');
        }
    });

    function handleVideoSelect(file) {
        const titleElement = dropzone.querySelector('.dropzone-title');
        const infoElement = dropzone.querySelector('.dropzone-info');
        const iconElement = dropzone.querySelector('.dropzone-icon');

        iconElement.innerHTML = '🎬';
        titleElement.textContent = `Файл готов: ${file.name}`;
        const fileSizeMb = (file.size / (1024 * 1024)).toFixed(1);
        infoElement.textContent = `Размер: ${fileSizeMb} MB`;
    }

    // ==================== 3. ОТПРАВКА НАСТРОЕК В ПАЙТОН БОТ ====================
    launchBtn.addEventListener('click', () => {
        // 1. Собираем выбранный язык из селектора (en, es, de, fr)
        // Наш бот в Python принимает: 'ru', 'en', 'es', 'hy'. 
        // Если в списке немецкий (de) или французский (fr), бот автоматом переведет на английский
        const selectedLang = targetLangSelect ? targetLangSelect.value : 'en';

        // 2. Смотрим пол голоса. Если чекбокс клонирования нажат — передаем "male", 
        // если нет — пускай будет базовый женский "female" для разнообразия
        const voiceGender = voiceCloningToggle && voiceCloningToggle.checked ? "male" : "female";

        // 3. Формируем JSON-пакет для Python-скрипта
        const webAppData = {
            action: "process_video",
            lang: selectedLang,
            voice: voiceGender
        };

        // Навешиваем красивый визуальный эффект нажатия перед закрытием
        launchBtn.disabled = true;
        launchBtn.querySelector('span').textContent = `🚀 ПРИМЕНЯЕМ НАСТРОЙКИ...`;

        setTimeout(() => {
            if (tg) {
                // Отправляем строку боту в чат
                tg.sendData(JSON.stringify(webAppData));
                // Автоматически закрываем Mini App, возвращая юзера в чат
                tg.close();
            } else {
                // Если тестируешь просто в браузере на компе
                alert(`Локальный тест! Отправлен JSON:\n${JSON.stringify(webAppData, null, 2)}`);
                launchBtn.disabled = false;
                launchBtn.querySelector('span').textContent = `✨ НАЧАТЬ ОБРАБОТКУ ВИДЕО`;
            }
        }, 500);
    });
});
