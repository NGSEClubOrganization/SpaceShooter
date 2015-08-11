var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update});

// load images and resources
function preload() {
	preloadStuff();
}

// start of game
function create() {
	creatTheGame();
}

// called every update (runs game)
function update() {
	updateEverything();	
}