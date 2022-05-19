class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame, leftBound, rightBound, hp, moveSpeed) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, key, frame);
        // setup Physics Sprite
        scene.add.existing(this);               // make it real
        scene.physics.add.existing(this);       // add physics body

        // set properties
        this.body.setImmovable();
        this.setOrigin(0, 1);  

        // set patrol boundaries
        this.leftBound = leftBound;
        this.rightBound = rightBound;

        // set intangibles
        this.hp = hp;
        this.moveSpeed = moveSpeed;

        
    }

    update(){
        if(this.y > 190 && this.y < 200){
            this.body.setVelocityX(0-this.moveSpeed);
        }
        if (this.x < this.leftBound && this.body.velocity.x < 0) {
            this.body.setVelocityX(this.moveSpeed);
            //if (this < MAX) this += INC;
        } else if (this.x > this.rightBound && this.body.velocity.x > 0) {
            this.body.setVelocityX(0-this.moveSpeed);
            //if (speed < MAX) speed += INC;
        }

        if(this.hp <= 0){
            this.destroy();
        }
    }

    damage(){
        this.hp--;
    }
}