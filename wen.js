function startGame() {
    const menu = document.getElementById('start-menu');
    menu.style.transition = "opacity 2s"; 
    menu.style.opacity = "0";
    setTimeout(() => {
        menu.style.display = 'none';
    }, 1000);
}
