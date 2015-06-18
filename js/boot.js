//Here we start the physic system and then call the 'load state'
var bootState = {

	create: function() {
		//enable arcade physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//calling the load state
		game.state.start('load');
	}
};