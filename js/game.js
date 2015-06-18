//create new game
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

//adding states of the game
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

//start game by calling the boot state
game.state.start('boot');
