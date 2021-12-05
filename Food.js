class Food {
    constructor(canvas) {
        this.canvas = canvas;
        this.unit = 5;
        this.ctx = canvas.getContext('2d');
        this.x = rand(0, canvas.width);
        this.y = rand(0, canvas.height);
        this.eaten = false;
        this.width = 32;
        this.height = 32;
    }

    render() {
        const context = this.ctx;
        context.beginPath();
        context.fillStyle = '#ff0000';
        context.rect(this.x, this.y, this.width, this.height);
        context.fill();
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * Math.floor(max / 32)) * 32;
}