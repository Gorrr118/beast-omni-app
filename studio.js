document.getElementById('render-btn').addEventListener('click', () => {
    // Собираем значения из полей ввода
    const format = document.getElementById('video-format').value;
    const text = document.getElementById('subtitles-text').value;
    const font = document.getElementById('font-style').value;
    const volume = document.getElementById('music-volume').value;

    console.log("Отправка параметров сборки на сервер...");
    console.log({ format, text, font, volume });

    // Меняем текст на кнопке во время сборки
    const btn = document.getElementById('render-btn');
    btn.disabled = true;
    btn.innerText = "⏳ СОЗДАНИЕ ВИДЕО...";
    btn.style.backgroundColor = "#555";

    // Сюда мы добавим fetch-запрос к твоему Python Flask/FastAPI, когда свяжем их
    setTimeout(() => {
        alert("Видео успешно создано и сохранено!");
        btn.disabled = false;
        btn.innerText = "⚡ СОЗДАТЬ ВИДЕО";
        btn.style.backgroundColor = "#00F0FF";
    }, 3000); // Имитация сборки 3 секунды
});
