document.getElementById('generate-btn').addEventListener('click', () => {
    const input = document.getElementById('plot-input').value.trim();
    const output = document.getElementById('tags-output');
    
    if(!input) {
        output.innerText = '#stream #gaming #gamer #live #content';
        return;
    }

    // Обработка текста для генерации хэштегов из сюжета
    const words = input.toLowerCase().replace(/[^\w\sа-яё]/gi, '').split(/\s+/);
    const uniqueTags = [...new Set(words.filter(w => w.length > 3))].slice(0, 5);
    
    let generated = '#stream #gaming ' + (uniqueTags.length ? uniqueTags.map(w => '#' + w).join(' ') : '#vibe');
    output.innerText = generated;
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const textToCopy = document.getElementById('tags-output').innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById('copy-btn');
        const oldText = btn.innerText;
        btn.innerText = '✅ Скопировано!';
        setTimeout(() => btn.innerText = oldText, 2000);
    });
});
