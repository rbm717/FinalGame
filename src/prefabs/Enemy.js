class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, frame, leftBound, rightBound, hp, moveSpeed, leftAnim, rightAnim) {
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
        this.leftAnim = leftAnim;
        this.rightAnim = rightAnim;

        this.body.setVelocityX(0-this.moveSpeed);
        this.anims.play(this.leftAnim);
    }

    update(){
        if(this.hp <= 0){
            this.destroy();
        }
        if (this.x < this.leftBound && this.body.velocity.x < 0) {
            this.body.setVelocityX(this.moveSpeed);
            this.anims.play(this.rightAnim);
        } else if (this.x > this.rightBound && this.body.velocity.x > 0) {
            this.body.setVelocityX(0-this.moveSpeed);
            this.anims.play(this.leftAnim);
        }

  
    }

    damage(){
        this.hp--;
        console.log("HP: " + this.hp);
    }
}