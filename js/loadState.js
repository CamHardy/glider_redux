// loadState.js
'use strict';

let LoadState = {};

LoadState.init = function () {
	// fun fact: you can initialize loady things here
};

LoadState.preload = function () {
	// load level(s)
	game.load.json('house', 'data/house.json');

	// load assets
	game.load.spritesheet('background:plain', 'assets/backgrounds/Plain_Room.png', 64, 342, 8, 0, 2);
	game.load.spritesheet('player', 'assets/player.png', 46, 18);
	game.load.image('player:shadow', 'assets/player_shadow.png');

	// load audio
};

LoadState.create = function () {
	// start the game!
	game.state.start('play', true, false, {room: 1});
};