const canvas = document.getElementById('game_canvas');
const loaderComponent = document.getElementById('loader')

initLoader();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const snake = new Snake({ x: canvas.width, y: canvas.height }, 20);
const game = new Game(snake, canvas);

window.addEventListener('keydown', snake.controller.bind(snake));
window.addEventListener('keyup', snake.controller.bind(snake));
game.run();


function initLoader() {
    let loader = setInterval(() => {
        if (game.finishedRendering) {
            clearInterval(loader);
            loaderComponent.classList.add('opacity-0')
        }
    }, 500)
}

