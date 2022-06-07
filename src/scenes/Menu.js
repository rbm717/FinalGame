class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    preload(){
        // Put Music and art here
    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.add.text(game.config.width/2, game.config.height/2-125, 'Stop The Count!', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '40px'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2-50, 'F for controls', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2, 'Space to start', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
        this.add.text(game.config.width/2, game.config.height/2+50, 'C for credits', {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'}).setOrigin(0.5, 0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySpace) ){
            this.scene.start('level01');
        }
        if(Phaser.Input.Keyboard.JustDown(keyC) ){
            this.scene.start('creditScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) ){
            this.scene.start('controlScene');
        }
    }
}