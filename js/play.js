var playState = {

	create: function() {
		this.facing = true;
		//background for the game
		game.add.sprite(0,0,'sky');

		//create a group called "platform" that contain the ground and ledges
		platforms = game.add.group();

		//enable physics for all the objects created on the platform group
		platforms.enableBody = true;

		//create pipe on platform
		var pipe = platforms.create(60, game.world.height-(game.world.height)*.2, 'pipe', 1);
		pipe.scale.setTo(0.5, 0.5)
		pipe.body.immovable = true;

		pipe = platforms.create(130, game.world.height-(game.world.height)*0.6, 'pipe', 0);
		pipe.scale.setTo(0.5,0.5)
		pipe.body.immovable = true;

		//create ledge on platform
		var ledge= platforms.create(0, game.world.height-(game.world.height)*0.6, 'ledge');
		ledge.scale.setTo(1.5, 0.5)
		ledge.body.immovable = true;

		//create player and its default settings
		this.player = game.add.sprite(32, game.world.height-(game.world.height)*0.4, 'frog');
		this.player.scale.setTo(1.5,1.5)

		//enable physics to player
		game.physics.arcade.enable(this.player);

		//player properties
		this.player.body.bounce.y = 0.6;
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;

		//add animations for player
		this.player.animations.add('left', [10, 11, 12, 13, 14, 15], 10, true);
		this.player.animations.add('right', [1, 2, 3, 4, 5, 6], 10, true);

		//enable keyboard input to control player
		this.cursors = game.input.keyboard.createCursorKeys();
		this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	
	update: function (){
		//collision of player with the platforms
		game.physics.arcade.collide(this.player, platforms);
		this.player.body.velocity.x = 0;

		if (this.cursors.right.isDown){
			this.player.body.velocity.x = 150;
			this.player.animations.play('right');
			//facing set to true if right press last
			this.facing = true;
		}
		else if(this.cursors.left.isDown){
			this.player.body.velocity.x = -150;
			this.player.animations.play('left');
			//facing set to false if left press last
			this.facing = false;
		}
		else{
			this.player.animations.stop();
			if (this.facing){
				this.player.frame = 0;
			}
			else{
				this.player.frame = 8;
			}
		}

		if (this.space.isDown){
			this.player.body.velocity.y = -100;
		}

	},

	win: function(){
		game.state.start('win');
	}
}