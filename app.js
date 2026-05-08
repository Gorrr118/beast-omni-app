console.log("JS запущен!");
setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    alert("Если ты это видишь, JS работает!");
}, 1000);
