class Controller {
    constructor(player, canvas) {
        this.canvas = canvas;
        this.player = player;
        this.unitSpeed = 32;
        this.queue = [];
    }


    handler(e) {
        const controls = this.player.controls;
        let state = e.type == 'keydown' ? true : false;
        switch (e.key) {
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

    isUnit(val) {
        return val % 32 == 0 ? true : false;
    }

    update() {
        const controls = this.player.controls;
        const head = this.player.head();
        if (controls.up && this.player.y_vel == 0) {
            this.player.y_vel = -this.unitSpeed;
            this.player.x_vel = 0;
        }
            

        if (controls.left && this.player.x_vel == 0) {
            this.player.x_vel = -this.unitSpeed;
            this.player.y_vel = 0;
        }

        if (controls.right && this.player.x_vel == 0) {
            this.player.x_vel = this.unitSpeed;
            this.player.y_vel = 0;
        }
        if (controls.down && this.player.y_vel == 0) {
            this.player.y_vel = this.unitSpeed;
            this.player.x_vel = 0;
        }
    
        head.x += this.player.x_vel;
        head.y += this.player.y_vel
    }
}
