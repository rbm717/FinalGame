class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 200;
        this.moveSpeedBackup = this.moveSpeed;
        this.standSpeed = this.moveSpeed;
        this.crouchSpeed = this.moveSpeed/2;
        this.jumpForce = -600;
        this.isCrouching = false;
        this.itemStatus = 0;
        this.isAttacking;
        this.facingRight = true;
    }


    update() {
        // Left & right movement
        if (keyLEFT.isDown && !this.isAttacking){
            this.facingRight = false;
            this.body.setVelocityX(0-this.moveSpeed);
            this.play('run_left', true);
        }else if(keyRIGHT.isDown && !this.isAttacking){
            this.facingRight = true;
            this.play('run_right', true);
            this.body.setVelocityX(this.moveSpeed);
        }else{
            this.body.setVelocityX(0);
            this.play('run_right', false);
            this.play('run_left', false);
        }

        if(this.body.velocity.x == 0 && !this.facingRight){
            this.setTexture('player_idle_left');
        }else if(this.body.velocity.x == 0 && this.facingRight){
            this.setTexture('player_idle_right');
        }

        // Controls jumping
        if (this.body.blocked.down && Phaser.Input.Keyboard.JustDown(keyUp) && !this.isCrouching && !this.isAttacking) {
            this.body.setVelocityY(this.jumpForce);
        }

        // Sliding
        if (Phaser.Input.Keyboard.JustDown(keyDown) && !this.isCrouching) {
            this.isCrouching = true;
            this.moveSpeed = this.crouchSpeed;
            //this.anims.pause();
            //this.setTexture('monster_slide', 0);
            this.y = game.config.height - 30;
            this.body.width = 110;
            this.body.height = this.height/2;
        }
        // Stands player back up from crouching
        if (Phaser.Input.Keyboard.JustUp(keyDown) && this.isCrouching) {
            this.isCrouching = false;
            this.moveSpeed = this.standSpeed;
            //this.anims.play('walk');
            this.body.width = this.width/2;
            this.body.height = this.height/2;
            this.y = game.config.height - 30;
            this.x -= 20;
        }
    }

    reset() {
        this.isCrouching = false;
        this.x = 0; 
    }

}



/** Notes for other devs:
 * 
 *  Item Status: 0 = nothing, 1 = melee, 2 = pistol, 3 = shotgun
 * 
 *  Ensure arcade physics is enabled on this object.
 * 
 *  Ensure keys are defined
 *  keyLEFT, keyRIGHT, keyDown, keyUp, keyF
 * 
 *  Find correct this.x and this.y reset() values
 */