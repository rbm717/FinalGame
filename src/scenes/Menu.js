class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        // Put Music and art here
    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width/2, game.config.height/2, 'W A S D to move', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'F to fire   X to drop weapon', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.25, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Space to start', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('level1');
        }
    }
}