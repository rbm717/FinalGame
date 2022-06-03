class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, jumpSFX) {
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
        this.jumpSFX = jumpSFX
    }


    update() {
        // Left & right movement
        if (keyLEFT.isDown && !this.isAttacking){
            this.facingRight = false;
            this.body.setVelocityX(0-this.moveSpeed);
            if (this.itemStatus == 0){
                this.play('run_left', true);
            }
            else if (this.itemStatus == 2){
                this.play('run_left_gun', true);
            }
            else if (this.itemStatus == 3){
                this.play('run_left_shotgun', true);
            }
            
        }else if(keyRIGHT.isDown && !this.isAttacking){
            this.facingRight = true;
            this.body.setVelocityX(this.moveSpeed);
            if (this.itemStatus == 0){
                this.play('run_right', true);
            }
            else if (this.itemStatus == 2){
                this.play('run_right_gun', true);
            }
            else if (this.itemStatus == 3){
                this.play('run_right_shotgun', true);
            }
        }else{
            this.body.setVelocityX(0);
            this.play('run_right', false);
            this.play('run_left', false);
        }

        if(this.body.velocity.x == 0 && !this.facingRight){
            if (this.itemStatus == 2){
                this.setTexture('player_idle_left_gun');
            }
            else if (this.itemStatus == 3){
                this.setTexture('player_idle_left_shotgun');
            }
            else {
                this.setTexture('player_idle_left');
            }
            
        }else if(this.body.velocity.x == 0 && this.facingRight){
            if (this.itemStatus == 2){
                this.setTexture('player_idle_right_gun');
            }
            else if (this.itemStatus == 3){
                this.setTexture('player_idle_right_shotgun');
            }
            else {
                this.setTexture('player_idle_right');
            }
        }

        // Controls jumping
        if (this.body.blocked.down && Phaser.Input.Keyboard.JustDown(keyUp) && !this.isCrouching && !this.isAttacking) {
            this.body.setVelocityY(this.jumpForce);
            this.jumpSFX.play();
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