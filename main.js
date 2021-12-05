const canvas = document.getElementById('canvas');
setCanvasDimensions(canvas);
const snake = new Snake(canvas);
const loaderComponent = document.getElementById('loader')
const controller = new Controller(snake, canvas);
const overScreen = document.getElementById('over')
window.addEventListener('keyup', controller.handler.bind(controller));
window.addEventListener('keydown', controller.handler.bind(controller))

let loader = setInterval(() => {
    if (snake.finishedRendering) {
        clearInterval(loader);
        loaderComponent.classList.add('opacity-0')
    }
}, 500)

render();
async function render() {
    if (!snake.alive) return handleFinish();
    snake.checkCollision();
    controller.update();
    snake.render();
    await wait(99);
    requestAnimationFrame(render)
}

function handleFinish() {
    overScreen.classList.add('show');
    overScreen.children[0].innerHTML = `Your score: ${snake.score}`
}
function setCanvasDimensions(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
}

function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
}

