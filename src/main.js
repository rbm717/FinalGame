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
    scene: [Menu, Level1, Ending]
}

let game = new Phaser.Game(config);

// Reserve key tags
let keySpace, keyA, keyD, keyW, keyS, keyUp, keyLEFT, keyRIGHT, keyDown, keyF, keyX;
// globals
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.height;