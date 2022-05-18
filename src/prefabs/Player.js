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
    }


    update() {
        // Left & right movement
        if (keyLEFT.isDown && !this.isAttacking){
            this.body.setVelocityX(0-this.moveSpeed);
            this.anims.play('run_left');
        }else if(keyRIGHT.isDown && !this.isAttacking){
            this.body.setVelocityX(this.moveSpeed);
            this.anims.play('run_right');
        }else{
            this.body.setVelocityX(0);
        }

        // Controls jumping
        if (this.body.touching.down && Phaser.Input.Keyboard.JustDown(keyUp) && !this.isCrouching && !isAttacking) {
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
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isAttacking){
            switch (this.itemStatus){
                case 0: //nothing
                    break;
                case 1: //melee
                    
                    break;
                case 2: //pistol
                    break;
                case 3: //shotgun
                    break;
            }
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