class Controls extends Phaser.Scene{
    constructor() {
        super("controlScene");
    }

    preload(){
        // Put Music and art here
    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(game.config.width/2, game.config.height/2-150, 'Controls (Press space to return to menu)', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '30px'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-100, 'Arrows to move', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-50, 'F to fire   X to drop weapon', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Attacking without a weapon in hand will use a knife attack', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+50, 'Be mindful of your weapon choice, some enemies can only be kiled by certain methods', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+100, 'Suits of armor are immune to bullets, and werewolves are immune to knives', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('menuScene');
        }
    }
}