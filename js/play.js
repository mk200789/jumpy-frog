
var playState = {

	create: function() {
		this.facing = true;
		this.total = 0;
		this.randTime = 600;
		this.deathCount = 0;

		//create timer
		this.gameTimer = game.time.create(false);
		//set timer to occur after 15 seconds
		this.gameTimer.loop(this.randTime *3, this.updateCounter, this);
		//this.gameTimer.loop(15000, this.updateCounter, this);
		//start timer
		this.gameTimer.start();

		//background for the game
		this.background = game.add.sprite(0,0,'sky');

		//create a group called "air" that contains the fireballs
		this.air = game.add.group();

		//enable physics for all the objects created on the air group
		this.air.enableBody = true;

		//create fireballs
		this.fire = this.air.create(65, game.world.height-(game.world.height)*0.2, 'fire', 1);
		this.fire.scale.setTo(3,3);


		//create pipes group
		this.pipes = game.add.group();
		this.pipes.enableBody = true;

		var pipe = this.pipes.create(60, game.world.height-(game.world.height)*.2, 'pipe', 1);
		pipe.scale.setTo(0.5, 0.5)
		pipe.body.immovable = true;

		pipe = this.pipes.create(130, game.world.height-(game.world.height)*0.6, 'pipe', 0);
		pipe.scale.setTo(0.5,0.5)
		pipe.body.immovable = true;

		pipe = this.pipes.create(195, game.world.height-(game.world.height)*0.3, 'pipe', 1);
		pipe.scale.setTo(0.5,0.6)
		pipe.body.immovable = true;

		//create a group called "platform" that contain the ground and ledges
		this.platforms = game.add.group();

		//enable physics for all the objects created on the platform group
		this.platforms.enableBody = true;

		//create ledge on platform
		var ledge= this.platforms.create(0, game.world.height-(game.world.height)*0.6, 'ledge');
		ledge.scale.setTo(1.5, 0.5);
		ledge.body.immovable = true;

		ledge= this.platforms.create(0, game.world.height-15, 'ledge');
		ledge.scale.setTo(2, 0.5);
		ledge.body.immovable = true;

		//create player and its default settings
		this.player = game.add.sprite(32, game.world.height-(game.world.height)*0.4, 'frog');
		this.player.scale.setTo(1.5,1.5);

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

		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.player, this.pipes);
		game.physics.arcade.overlap(this.player, this.fire, this.deathCounter, null, this);
		this.player.body.velocity.x = 0;

		if(!this.player.alive){
			this.player.reset(32, game.world.height-(game.world.height)*0.4);
		}

		if (this.fire.position.y < 0){
			this.fire.destroy();
			this.fire = this.air.create(65, game.world.height-(game.world.height)*0.2, 'fire', 1);
			this.fire.scale.setTo(3,3);
		}

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
			this.player.body.velocity.y = -200;
		}

	},

	deathCounter: function() {
		//this.player.kill();
		if (this.deathCount > 3){
			this.player.kill();
			game.state.start('gameover');
		}
		else {
			this.player.kill();
			this.deathCount++;
		}
	},

	updateCounter: function(){
		this.total++;
		this.fire.body.velocity.y = -400;
		this.randTime = game.rnd.integerInRange(5, 20);
	},

	win: function(){
		game.state.start('win');
	}
}