class Snake {
    constructor({ x, y }, size) {
        this.x = getRandPos(x);
        this.y = getRandPos(y);
        this.x_vel = 0;
        this.y_vel = 0;
        this.size = size;
        this.up = false;
        this.controls = {
            up: false,
            down: false,
            right: false,
            left: false
        }
        this.color = 'white';
        this.unitSpeed = 20;
        this.body = new Array();

        this.body.push({ x: this.x, y: this.y })
    }

    head() {
        return this.body[0];
    }

    controller(event) {
        const controls = this.controls;
        const state = event.type == 'keydown' ? true : false;

        switch (event.key) {
            case 'ArrowUp': case 'w':
                controls.up = state;
                break; case 'a':
            case 'ArrowLeft':
                controls.left = state;
                break; case 'd':
            case 'ArrowRight':
                controls.right = state;
                break;
            case 'ArrowDown': case 's':
                controls.down = state;
                break;
        }
    }

    update() {
        const controls = this.controls;
        const head = this.head();
        if (controls.up && this.y_vel == 0) {
            this.y_vel = -this.unitSpeed;
            this.x_vel = 0;
        }


        if (controls.left && this.x_vel == 0) {
            this.x_vel = -this.unitSpeed;
            this.y_vel = 0;
        }

        if (controls.right && this.x_vel == 0) {
            this.x_vel = this.unitSpeed;
            this.y_vel = 0;
        }
        if (controls.down && this.y_vel == 0) {
            this.y_vel = this.unitSpeed;
            this.x_vel = 0;
        }

        head.x += this.x_vel;
        head.y += this.y_vel
    }
}