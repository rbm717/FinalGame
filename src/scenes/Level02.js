class Level02 extends Phaser.Scene {
    constructor() {
        super("level02");
    }

    preload(){
        // Sets path so all files loaded from assets folder
        this.load.path = "./assets/";
        // Loads all static images and textures
        this.load.image('player', 'player.png');
        this.load.image('player_idle_left', 'playerIdleLeft.png');
        this.load.image('player_idle_right', 'playerIdleRight.png');
        this.load.image('player_idle_left_gun', 'playerIdleLeftGun.png');
        this.load.image('player_idle_right_gun', 'playerIdleRightGun.png');
        this.load.image('player_idle_left_shotgun', 'playerIdleLeftShotgun.png');
        this.load.image('player_idle_right_shotgun', 'playerIdleRightShotgun.png');

        this.load.image('thrall', 'thrall.png');
        this.load.image('pistol', 'pistol1.png');
        this.load.image('shotgun', 'shotgun1.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('villager', 'villager.png');
        this.load.image('gem', 'gem.png');
        
        // Loads animations
        this.load.spritesheet('player_right', 'player_right.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_right_gun', 'player_right_gun.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_jump_right', 'player_jump_right.png', {frameWidth: 54, frameHeight: 60, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player_left', 'player_left.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_left_gun', 'player_left_gun.png', {frameWidth: 54, frameHeight: 67, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_jump_left', 'player_jump_left.png', {frameWidth: 54, frameHeight: 60, startFrame: 0, endFrame: 2});
        this.load.spritesheet('pistol_hover', 'pistol.png', {frameWidth: 33, frameHeight: 18, startFrame: 0, endFrame: 3});

        // Shotgun animations
        this.load.spritesheet('player_right_shotgun', 'player_right_shotgun.png', {frameWidth: 53.75, frameHeight: 66, startFrame: 0, endFrame: 3});
        this.load.spritesheet('player_left_shotgun', 'player_left_shotgun.png', {frameWidth: 53.75, frameHeight: 66, startFrame: 0, endFrame: 3});

        // Knife animations
        this.load.spritesheet('player_right_knife', 'player_right_knife.png', {frameWidth: 74, frameHeight: 64, startFrame: 0, endFrame: 2});
        this.load.spritesheet('player_left_knife', 'player_left_knife.png', {frameWidth: 74, frameHeight: 64, startFrame: 0, endFrame: 2});


        // Thrall
        this.load.spritesheet('thrall_left', 'thrall_left.png', {frameWidth: 41, frameHeight: 46, startFrame: 0, endFrame: 3});
        this.load.spritesheet('thrall_right', 'thrall_right.png', {frameWidth: 41, frameHeight: 46, startFrame: 0, endFrame: 3});

        // Werewolf
        this.load.spritesheet('werewolf_left', 'werewolf_left.png', {frameWidth: 61, frameHeight: 66, startFrame: 0, endFrame: 3});
        this.load.spritesheet('werewolf_right', 'werewolf_right.png', {frameWidth: 61, frameHeight: 66, startFrame: 0, endFrame: 3});

        // Armor
        this.load.spritesheet('metal_left', 'armor_left.png', {frameWidth: 35.75, frameHeight: 76, startFrame: 0, endFrame: 3});
        this.load.spritesheet('metal_right', 'armor_right.png', {frameWidth: 35.75, frameHeight: 76, startFrame: 0, endFrame: 3});

        // For loading the level map
        this.load.image("tiles", "spritesheet.png");
        this.load.image("background", "backgroundvamp.png");
        this.load.spritesheet("level02_sheet", "spritesheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("level02_map", "level02.json");
    
        // Preloads sound
        this.load.audio('bullet_sfx', 'bullet-hit_sfx.wav');
        this.load.audio('coin_sfx', 'coins_sfx.wav');
        this.load.audio('gun_sfx', 'gun-load_sfx.wav');
        this.load.audio('jump_sfx', 'jump_sfx.mp3');
        this.load.audio('shoot_sfx', 'shoot_sfx.ogg');
        this.load.audio('thrall_sfx', 'thrall.wav'); 
        this.load.audio('shotgun_sfx', 'shotgun.wav');
        this.load.audio('roar_sfx', 'roar.wav');
        this.load.audio('metal_sfx', 'metal.wav');
        this.load.audio('cocking_sfx', 'cocking.wav');
        this.load.audio('bat_sfx', 'bat.wav');
        this.load.audio('villager_sfx', 'villager.wav');
        this.load.audio('gem_sfx', 'Coin.wav');
    }

    create(){
        // add a tilemap
        const map = this.add.tilemap("level02_map");
        // add a tileset to the map
        const tileset = map.addTilesetImage("BasicStuff", "tiles");
        const bg = map.addTilesetImage("BGvamp", "background");

        // create tilemap layers
        const backgroundLayer = map.createLayer("Background", bg, 0, 0);
        const groundLayer = map.createLayer("Floor", tileset, 0, 0);
        const sceneryLayer = map.createLayer("Scenery", tileset, 0, 0);
        this.bulletArray = [];
        this.thrallArray = [];
        this.wolfArray = [];
        this.metalArray = [];

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

        // Establishes bounds and gravity of level
        this.physics.world.setBounds(0, 0, 900, 1000);
        this.gravity = 1500;

        // Note: lines 117 to 263 establish animations and sound

        // Establishes animations 
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
            key: 'run_right_gun',
            frames: this.anims.generateFrameNumbers('player_right_gun', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left_gun',
            frames: this.anims.generateFrameNumbers('player_left_gun', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_right_shotgun',
            frames: this.anims.generateFrameNumbers('player_right_shotgun', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'run_left_shotgun',
            frames: this.anims.generateFrameNumbers('player_left_shotgun', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stab_right_knife',
            frames: this.anims.generateFrameNumbers('player_right_knife', { start: 0, end: 2, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'stab_left_knife',
            frames: this.anims.generateFrameNumbers('player_left_knife', { start: 0, end: 2, first: 0}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'pistol_anim',
            frames: this.anims.generateFrameNumbers('pistol_hover', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'thrall_left_anim',
            frames: this.anims.generateFrameNumbers('thrall_left', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'thrall_right_anim',
            frames: this.anims.generateFrameNumbers('thrall_right', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'werewolf_left_anim',
            frames: this.anims.generateFrameNumbers('werewolf_left', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'werewolf_right_anim',
            frames: this.anims.generateFrameNumbers('werewolf_right', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'metal_left_anim',
            frames: this.anims.generateFrameNumbers('metal_left', { start: 0, end: 3, first: 0}),
            frameRate: 3.5,
            repeat: -1
        });
        this.anims.create({
            key: 'metal_right_anim',
            frames: this.anims.generateFrameNumbers('metal_right', { start: 0, end: 3, first: 0}),
            frameRate: 3.5,
            repeat: -1
        });

        // Loads sounds
        this.bulletSFX = this.sound.add('bullet_sfx', {
            volume: 1,
            loop: false
        });
        this.coinSFX = this.sound.add('coin_sfx', {
            volume: 1,
            loop: false
        });
        this.gunSFX = this.sound.add('gun_sfx', {
            volume: 1,
            loop: false
        });
        this.jumpSFX = this.sound.add('jump_sfx', {
            volume: 1,
            loop: false
        });
        this.shootSFX = this.sound.add('shoot_sfx', {
            volume: 1,
            loop: false
        });
        this.thrallSFX = this.sound.add('thrall_sfx', {
            volume: .7,
            loop: false
        });
        this.roarSFX = this.sound.add('roar_sfx', {
            volume: 3,
            loop: false
        });
        this.shotgunSFX = this.sound.add('shotgun_sfx', {
            volume: 10,
            loop: false
        });
        this.batSFX = this.sound.add('bat_sfx', {
            volume: 1,
            loop: false
        });
        this.cockingSFX = this.sound.add('cocking_sfx', {
            volume: 2.5,
            loop: false
        });
        this.metalSFX = this.sound.add('metal_sfx', {
            volume: 1,
            loop: false
        });
        this.villagerSFX = this.sound.add('villager_sfx', {
            volume: 1,
            loop: false
        });
        this.gemSFX = this.sound.add('gem_sfx', {
            volume: 1,
            loop: false
        });

        // Instantiates player character
        this.playerChar = new Player(this, 100, 100, 'player', 0, this.jumpSFX).setOrigin(0,0);
        this.physics.world.enable(this.playerChar);
        this.playerChar.body.setGravityY(this.gravity);
        this.playerChar.body.setSize(this.playerChar.width/2);
        this.playerChar.setScale(0.5);
        this.playerChar.body.setCollideWorldBounds(true);

        // Adds villager and gems to level
        this.villager = this.physics.add.sprite(615, 500, 'villager').setOrigin(0,0);
        this.villager.setScale(0.5);
        this.gem = this.physics.add.sprite(265, 160, 'gem').setOrigin(0,0);
        this.gem.setScale(0.5);
        this.gem2 = this.physics.add.sprite(5, 255, 'gem').setOrigin(0,0);
        this.gem2.setScale(0.5);
        this.gems = this.add.group();
        this.gems.add(this.gem);
        this.gems.add(this.gem2);

        this.melee = this.physics.add.sprite(-100, -100, 'bullet');
        this.melee.body.setAllowGravity(false);
        this.melee.alpha = 0.1;

        // Adds enemies to screen and scales size
        this.enemy1 = new Enemy(this, 15, 510, 'thrall', 0, 15, 120, 4, 50, 'thrall_left_anim', 'thrall_right_anim').setOrigin(0,0);
        this.enemy1.body.setSize(this.enemy1.width/2);
        this.enemy1.setScale(0.6);

        this.enemy2 = new Enemy(this, 220, 510, 'thrall', 0, 130, 220, 4, 50, 'thrall_left_anim', 'thrall_right_anim').setOrigin(0,0);
        this.enemy2.body.setSize(this.enemy2.width/2);
        this.enemy2.setScale(0.6);

        this.enemy3 = new Enemy(this, 670, 120, 'thrall', 0, 670, 820, 8, 100, 'werewolf_left_anim', 'werewolf_right_anim').setOrigin(0,0);
        this.enemy3.body.setSize(this.enemy3.width/2);
        this.enemy3.setScale(0.6);

        // Adds enemies to arrays for collision detection
        this.thrallArray = [this.enemy1, this.enemy2]
        this.metalArray = []
        this.wolfArray = [this.enemy3]

        // Enables collisions with the ground layer of the map
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.playerChar, groundLayer);
        this.physics.add.collider(this.villager, groundLayer);
        this.physics.add.collider(this.gems, groundLayer);
        this.physics.add.collider(this.thrallArray, groundLayer);
        this.physics.add.collider(this.metalArray, groundLayer);
        this.physics.add.collider(this.wolfArray, groundLayer);
        this.physics.add.collider(this.bulletArray, groundLayer, (obj1, obj2) => {
            obj1.destroy();
        });

        // Allows villager to be "collected"
        this.physics.add.collider(this.villager, this.playerChar, (villager, player) => {
            villager.destroy();
            this.villagerSFX.play();
            this.scene.start('level03');
            score += villagerScore;
        });
        this.physics.add.collider(this.gems, this.playerChar, (gem, player) => {
            gem.destroy();
            this.gemSFX.play();
            score += gemScore;
        });

        // Adds collider between player and enemies: Knocks player back, damages player, and plays sound
        this.physics.add.collider(this.thrallArray, this.playerChar, (enemy, player) => {
            if(!this.thrallSFX.isPlaying){
                this.thrallSFX.play();
            }
            if(!this.playerChar.facingRight){
                this.playerChar.x += 20;
            }else{
                this.playerChar.x -= 20;
            }
            this.playerChar.hp --;
        });
        this.physics.add.collider(this.metalArray, this.playerChar, (enemy, player) => {
            if(!this.thrallSFX.isPlaying){
                this.metalSFX.play();
                
            }
            if(!this.playerChar.facingRight){
                this.playerChar.x += 20;
            }else{
                this.playerChar.x -= 20;
            }
            this.playerChar.hp --;
        });
        this.physics.add.collider(this.wolfArray, this.playerChar, (enemy, player) => {
            if(!this.thrallSFX.isPlaying){
                this.roarSFX.play();
            }
            if(!this.playerChar.facingRight){
                this.playerChar.x += 20;
            }else{
                this.playerChar.x -= 20;
            }
            this.playerChar.hp --;
        });

        // Adds collisions between enemies and bullets
        this.physics.add.overlap(this.thrallArray, this.bulletArray, (obj1, obj2) => {
            obj1.damage();
            obj2.destroy();
        });
        this.physics.add.overlap(this.wolfArray, this.bulletArray, (obj1, obj2) => {
            obj1.damage();
            obj2.destroy();
        });
        this.physics.add.overlap(this.metalArray, this.bulletArray, (obj1, obj2) => {
            this.bulletSFX.play();
            obj2.destroy();
        });

        this.physics.add.overlap(this.thrallArray, this.melee, (obj1, obj2) => {
            obj1.damage();
            obj2.x = -100;
        })
        this.physics.add.overlap(this.metalArray, this.melee, (obj1, obj2) => {
            obj1.damage();
            obj2.x = -100;
        })

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.playerChar, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setZoom(1.5);

        // sets up timer for knife attacks
        this.timer = 0;
        this.delay = 500;
        this.stabTimer = 0;
    }

    update(time, delta){
        // Switches to end game scene when player health reaches 0
        if(this.playerChar.hp <= 0){
            this.scene.start('EndingScene');
            return;
        }

        console.log('scene2');

        // Updates player and enemy positions
        this.playerChar.update();
        this.thrallArray.forEach(element => {
            element.update();
        });
        this.metalArray.forEach(element => {
            element.update();
        });
        this.wolfArray.forEach(element => {
            element.update();
        });
        this.bulletArray.forEach(element => {
            element.update();
        });
        
        // Updates melee timer and resets melee hit box
        this.timer += delta;
        this.stabTimer += delta;
        while (this.timer > this.delay) {
            this.timer -= this.delay;
            this.melee.x = -100;
            
            
        }

        // Resets melee boolean
        if (this.playerChar.isStabbing && this.stabTimer > this.stabTime + 800){
            this.playerChar.isStabbing = false;
        }

        // Attacks
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            switch (this.playerChar.itemStatus){
                case 0: //melee
                    this.stabTime = this.stabTimer;
                    this.playerChar.isStabbing = true;
                    this.melee.y = this.playerChar.y+15;
                    if(this.playerChar.facingRight){
                        this.melee.x = this.playerChar.x+30;
                        if(this.playerChar.anims.currentAnim.key != 'stab_right_knife'){
                            this.playerChar.play('stab_right_knife');
                        }
                    }else{
                        this.melee.x = this.playerChar.x-5;
                        this.playerChar.anims.play('stab_left_knife');
                    }
                    break;
                case 1: //nothing
                    break;
                case 2: //pistol
                    this.bullet = new Bullet(this, 100, 100, 'bullet', 0, this.playerChar.facingRight ? -1 : 1).setOrigin(0,0);
                    this.bullet.x = this.playerChar.x;
                    this.bullet.y = this.playerChar.y+15;
                    this.bulletArray.push(this.bullet);
                    this.shootSFX.play();
                    break;
                case 3: //shotgun
                    this.bullet = new Bullet(this, 100, 100, 'bullet', 0, this.playerChar.facingRight ? -1 : 1).setOrigin(0,0);
                    this.bullet.x = this.playerChar.x;
                    this.bullet.y = this.playerChar.y;
                    this.bulletArray.push(this.bullet);


                    this.bullet1 = new Bullet(this, 100, 100, 'bullet', 0, this.playerChar.facingRight ? -1 : 1).setOrigin(0,0);
                    this.bullet1.x = this.playerChar.x;
                    this.bullet1.y = this.playerChar.y + 5;
                    this.bulletArray.push(this.bullet1);


                    this.bullet2 = new Bullet(this, 100, 100, 'bullet', 0, this.playerChar.facingRight ? -1 : 1).setOrigin(0,0);
                    this.bullet2.x = this.playerChar.x;
                    this.bullet2.y = this.playerChar.y - 5;
                    this.bulletArray.push(this.bullet2);
                    this.shotgunSFX.play();
                    break;
            }

        }
        if (Phaser.Input.Keyboard.JustDown(keyX)){
            console.log(this.playerChar.x + ", " + this.playerChar.y);
            //dropping is TOO buggy

            // if (this.playerChar.itemStatus == 2){
            //     this.pistolPickup = this.physics.add.sprite(this.playerChar.x + 4, this.playerChar.y + 40, 'pistol');
            //     this.pistolPickup.anims.play('pistol_anim');
            //     this.pistolPickup.setScale(0.5);
            //     //this.pistolPickup.height *= 2;
            //     this.pistolPickup.setSize(this.pistolPickup.width*1.5, this.pistolPickup.height*1.5);
            //     this.pistolArray.push(this.pistolPickup);
            // }
            // else if (this.playerChar.itemStatus == 3){
            //     this.shotgunPickup = this.physics.add.sprite(this.playerChar.x + 4, this.playerChar.y + 14, 'shotgun');
            //     //this.shotgunPickup.anims.play('pistol_anim');
            //     this.shotgunPickup.setScale(0.5);
            //     //this.pistolPickup.height *= 2;
            //     this.shotgunPickup.setSize(this.shotgunPickup.width*1.5, this.shotgunPickup.height*1.5);
            //     this.shotgunArray.push(this.shotgunPickup);
            //}
            this.playerChar.itemStatus = 0;
        }
    }
}