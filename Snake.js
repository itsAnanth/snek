class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 32;
        this.height = 32;
        this.alive = true;
        this.score = 0;
        this.snake_col = 'lightblue';
        this.snake_border = '#000000';
        this.x_vel = 0;
        this.y_vel = 0;
        this.finishedRendering = false;
        this.scoreHolder = document.getElementById('score');
        this.ctx = canvas.getContext('2d');
        this.controls = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        this.snake = new Array();
        this.snake.push({
            x: this.rand(0, canvas.width),
            y: this.rand(0, canvas.height)
        });
        this.x = this.snake[0].x;
        this.y = this.snake[0].y;
        this.food = null;
    }

    genFood() {
        this.food = new Food(this.canvas);
    }

    head() {
        return this.snake[0];
    }

    addScore() {
        this.score++;
        this.scoreHolder.innerText = this.score;
    }

    drawBoard(){
        const canvas = this.canvas;
        const bw = canvas.width;
        const bh = canvas.height;
        const context = canvas.getContext('2d');
        context.lineWidth = 2;
        context.fillStyle = '#80af49';
        context.strokeStyle = "#808080";
        for (let x = 0; x < bw; x += this.width) {
            for (let y = 0; y < bh; y += this.width) {
               context.strokeRect(x, y, this.width, this.height); 
               context.fillRect(x, y, this.width, this.height);
            }
        }
    }

    render() {
        if (!this.food) this.genFood();
        const context = this.ctx;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard();
        context.beginPath();
        context.fillStyle = '#ff0000';
        context.rect(this.food.x, this.food.y, this.food.width, this.food.height);
        context.fill();

        for (let i = 0; i < this.snake.length; i++) {
            context.fillStyle = this.snake_col;
            context.strokestyle = this.snake_border;
            context.fillRect(this.snake[i].x, this.snake[i].y, this.width, this.height);
            context.strokeRect(this.snake[i].x, this.snake[i].y, this.width, this.height);
        }
        this.finishedRendering = !this.finishedRendering ? true : false;
    }

    checkCollision() {
        const head = this.head();
        if (
            (head.x < 0 || head.x > this.canvas.width + this.width) ||
            (head.y < 0 || head.y > this.canvas.height + this.height)
        ) this.alive = false
    
        for (let i = 1; i < this.snake.length; i++) {
            if (
                (head.x > this.snake[i].x && head.x < this.snake[i].x + this.width) && 
                (head.y > this.snake[i].y && head.y < this.snake[i].y + this.height)
            ) this.alive = false;
        }
        if (
            this.food &&
            (head.x == this.food.x) && (head.y == this.food.y)
        ) {
            this.food = null;
            this.addScore()
        } else this.snake.pop();

        this.snake.unshift({ x: head.x, y: head.y })
        // return false;
    }

    rand(min, max) {
        return Math.round((Math.random() * (max - min) + min) / this.width) * this.width;
    }

}

