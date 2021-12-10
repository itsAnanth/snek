class Game {
    constructor(snake, canvas) {
        this.scoreHolder = document.getElementById('score');
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.snake = snake;
        this.food = null;
        this.score = 0;
        this.foodExists = false;
        this.lost = false;
        this.loop = null;
        this.finishedRendering = false;
    }

    run() {
        this.loop = setInterval(this.render.bind(this), 1000 / 20);
    }

    renderSnake() {
        for (var i = 0; i < this.snake.body.length; i++) {
            this.rect(this.snake.body[i].x + 2.5, this.snake.body[i].y + 2.5,
                this.snake.size - 5, this.snake.size - 5, this.snake.color)
        }
    }

    renderFood() {
        this.rect(this.food.x, this.food.y, this.food.size, this.food.size, this.food.color);
    }

    genFood() {
        if (!this.foodExists) {
            this.food = new Food({ x: this.canvas.width, y: this.canvas.height })
            console.log(this.food.x, this.food.y)
            this.foodExists = true;
        }
    }

    addScore() {
        this.score++;
        this.scoreHolder.innerHTML = this.score;
    }

    render() {
        if (this.lost) return this.handleFinish();
        this.checkCollision();
        // console.log(this);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.genFood();
        this.snake.update();
        this.renderSnake();
        this.renderFood();
        !this.finishedRendering ? this.finishedRendering = true : ()=>{};
    }

    handleFinish() {
        clearInterval(this.loop);
        console.log(this.snake.head().y)
        alert('lost sobad');
    }

    checkCollision() {
        const shallow = snake.head();
        const head = shallow;

        if (
            head.x < 0 ||
            head.x > this.canvas.width ||
            head.y < 0 ||
            head.y > this.canvas.height
        ) this.lost = true;
        if (this.food && (head.x == this.food.x) && (this.food.y == head.y)) {
            this.foodExists = false;
            this.food = null;
            this.addScore();
        } else this.snake.body.pop();
        this.snake.body.unshift({ x: head.x, y: head.y });
    }

    rect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
}