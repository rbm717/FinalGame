class Ending extends Phaser.Scene{
    constructor() {
        super("EndingScene");
    }

    preload(){
        // Put Music and art here
    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width/2, game.config.height/4, 'YOU ARE DEAD', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        
        this.add.text(game.config.width/2, game.config.height/2, 'Press Space to try again', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('level01');
        }
    }
}