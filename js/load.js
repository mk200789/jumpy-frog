//Here we load the assets and spritesheets, and then call the menu state
var loadState = {
	preload: function() {
		// load image in the order you want it to appear
		game.load.image('sky', 'assets/sky.png');
		game.load.image('start-button', 'assets/start-button.png')
		game.load.image('ledge', 'assets/platform.png');
		game.load.image('ground', 'assets/ground.png');
		game.load.spritesheet('fire', 'assets/fire.png', 8, 19);
		game.load.spritesheet('pipe', 'assets/pipes.png', 54, 320);
		game.load.spritesheet('frog', 'assets/frog2.png', 16, 16);
	},

	create: function() {
		//call the menu state
		game.state.start('menu');
	}
};