class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, dir) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);               // make it real
        scene.physics.add.existing(this);       // add physics body
        this.direction = dir;
        this.travelSpeed = 300;
        this.body.allowGravity = false;
        if (this.direction == 1){
            this.body.setVelocityX(0-this.travelSpeed);
        }
        else if(this.direction == -1){
            this.body.setVelocityX(this.travelSpeed);
        }
    }


    update() {


    }
}

