class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload(){
        // Sets path so all files loaded from assets folder
        this.load.path = "./assets/";
        // Loads all static images and textures
        this.load.image('player', 'player.png');
        this.load.image('player_idle_left', 'playerIdleLeft.png');
        this.load.image('player_idle_right', 'playerIdleRight.png');
        this.load.image('thrall', 'antiplayer.png');
        this.load.image('pistol', 'pistol1.png');
        this.load.image('bullet', 'bullet.png');
        
        // Loads animations
        this.load.spritesheet('player_right', 'player_right.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_right_gun', 'player_right_gun.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_jump_right', 'player_jump_right.png', {frameWidth: 54, frameHeight: 60, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player_left', 'player_left.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_left_gun', 'player_left_gun.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_jump_left', 'player_jump_left.png', {frameWidth: 54, frameHeight: 60, startFrame: 0, endFrame: 2});
        this.load.spritesheet('pistol_hover', 'pistol.png', {frameWidth: 33, frameHeight: 18, startFrame: 0, endFrame: 3});

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
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, game.config.width, game.config.height);
        this.gravity = 1500;

        // Establishes animations 
            // Note: Perhaps move to separate file? Is that even possible
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
        this.anims.create({
            key: 'pistol_anim',
            frames: this.anims.generateFrameNumbers('pistol_hover', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.playerChar = new Player(this, 100, 100, 'player').setOrigin(0,0);
        this.physics.world.enable(this.playerChar);
        this.playerChar.body.setGravityY(this.gravity);
        this.playerChar.body.setSize(this.playerChar.width/2);
        this.playerChar.setScale(0.5);
        // this.playerChar.body.setCollideWorldBounds(true);

        this.pistolPickup = this.physics.add.sprite(50, 200, 'pistol');
        this.pistolPickup.anims.play('pistol_anim');
        this.pistolPickup.setScale(0.5);
        //this.pistolPickup.height *= 2;
        this.pistolPickup.setSize(this.pistolPickup.width*1.5, this.pistolPickup.height*1.5);

        this.antiPlayer = new Enemy(this, 170, 180, 'thrall', 0, 100, 180, 4, 50).setOrigin(0,0);
        this.antiPlayer.body.setSize(this.antiPlayer.width/2);
        this.antiPlayer.setScale(0.5);

        // Enables collision with the ground layer of the map
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.playerChar, groundLayer);
        this.physics.add.collider(this.antiPlayer, groundLayer);
        this.physics.add.collider(this.pistolPickup, groundLayer);
        this.physics.add.collider(this.antiPlayer, this.playerChar);

        //this.physics.add.collider(this.bullet, groundLayer);
        this.physics.add.overlap(groundLayer, this.bullet, (obj1, obj2) => {
            obj2.destroy();
        })

        this.physics.add.overlap(this.playerChar, this.pistolPickup, (obj1, obj2) => {
            this.playerChar.itemStatus = 2;
            obj2.destroy();
        })

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.playerChar, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setZoom(1.5);
    }

    update(){
        this.playerChar.update();
        this.antiPlayer.update();
        // console.log(this.antiPlayer.y);
        // console.log(this.antiPlayer.x);
        if(this.antiPlayer.y == 208){
            //this.antiPlayerlayer.body.setVelocityX(-2);
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)){
            switch (this.playerChar.itemStatus){
                case 0: //nothing
                    break;
                case 1: //melee
                    break;
                case 2: //pistol
                    this.bullet = new Bullet(this, 100, 100, 'bullet', 0, this.playerChar.facingRight ? -1 : 1).setOrigin(0,0);
                    this.bullet.x = this.playerChar.x;
                    this.bullet.y = this.playerChar.y;

                    //this.bullet.body.setGravityY = 0;
                    break;
                case 3: //shotgun
                    break;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyX)){
            
            if (this.playerChar.itemStatus == 2){
                this.pistolPickup = this.physics.add.sprite(50, 200, 'pistol');
                this.pistolPickup.anims.play('pistol_anim');
                this.pistolPickup.setScale(0.5);
                //this.pistolPickup.height *= 2;
                this.pistolPickup.setSize(this.pistolPickup.width*1.5, this.pistolPickup.height*1.5);
                this.pistolPickup.x = this.playerChar.x + 2;
                this.pistolPickup.y = this.playerChar.y + 2;
            }
            this.playerChar.itemStatus = 0;
        }
    }
}