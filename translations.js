console.log("TRANSLATIONS.JS ЗАГРУЗИЛСЯ УСПЕШНО!");

const translations = {
    en: {
        ref_title: "TEST EN TITLE"
    },
    ru: {
        ref_title: "ТЕСТОВЫЙ РУССКИЙ ЗАГОЛОВОК"
    }
};

function changeLanguage(lang) {
    console.log("Вызвана смена языка на:", lang);
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded сработал в translations.js");
    changeLanguage('ru'); // Сразу принудительно включим русскую локаль для проверки
});
