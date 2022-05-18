class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image('player', 'player.png');
        
        this.load.spritesheet('player_right', 'player_right.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_left', 'player_left.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
    
        // Temporary, replace with finalized assets
        this.load.image("1bit_tiles", "colored_packed.png");
        this.load.spritesheet("kenney_sheet", "colored_transparent_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("platform_map", "tilemap01.json");
    }

    create(){
        // add a tilemap
        const map = this.add.tilemap("platform_map");
        // add a tileset to the map
        const tileset = map.addTilesetImage("colored_packed", "1bit_tiles");
        // create tilemap layers
        const backgroundLayer = map.createLayer("Background", tileset, 0, 0);
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const sceneryLayer = map.createLayer("Scenery", tileset, 0, 0);

        // Establishes keyboard input
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.gravity = 1500;

        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNumbers('player_right', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNumbers('player_left', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.playerChar = new Player(this, 100, 100, 'player').setOrigin(0,0);
        this.physics.world.enable(this.playerChar);
        this.playerChar.body.setGravityY(this.gravity);
        this.playerChar.body.setCollideWorldBounds(true);

        groundLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.playerChar, groundLayer);
    }

    update(){
        this.playerChar.update();
    }
}