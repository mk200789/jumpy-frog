var gameoverState = {
	create: function() {
		//background for the game
		this.background = game.add.sprite(0,0,'sky');

		//display game name
		var over = game.add.text(120, 30, 'Game Over', {font: '100px Arial', fill: '#FF0000'});
		var gameLabel = game.add.text(270, 150, 'Try again! :(', {font: '50px Arial', fill: '#4DDBB8'});

		//include a start button
	    this.startButton = this.game.add.button(this.game.width/2, 300, 'start-button', this.startClick, this);
	    this.startButton.anchor.setTo(0.5,0.5);

		//display game instruction 
		var instrLabel = game.add.text(320, game.world.height-180, 'Press space bar to jump.', {font: '15px Arial', fill :'#FFFFFF'});
	},

	//start function cals the play state
	startClick: function(){
		game.state.start('play');
	}
	
};