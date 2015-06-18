//Here we display instructions readable to the player, and wait till there's a response 
var menuState = {
	create: function(){
		//display game name
		var gameLabel = game.add.text(270, 100, 'Jumpy frog!', {font: '50px Arial', fill: '#4DDBB8'});

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