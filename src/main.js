/* Group Members: Raymond Metzger, Devin Wear, Vinicius Vella Sarlo Sanchez, Justin Hu*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    // Sets the screen to automatically fit the display
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug:true, // Used to observe hitboxes when testing
            useTree: false,
            gravity: { y: 100 }
        }
    },
    scene: [Menu, Level01, Level02, level03, Ending, EndingGood, Controls, Credits]
}

let game = new Phaser.Game(config);
let score = 0;
let gemScore = 100;
let thrallScore = 500;
let metalScore = 1000;
let werewolfScore = 1500;
let villagerScore = 5000;

// Reserve key tags
let keySpace, keyA, keyD, keyW, keyS, keyUp, keyLEFT, keyRIGHT, keyDown, keyC, keyF, keyX;
// globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.height;
// Allows music to be played continuously amongst all scenes
let corridorMusic;