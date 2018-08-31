// playState.js
'use strict';

let PlayState = {};

PlayState.init = function (data) {
	// init game variables from data argument
	this.house = game.cache.getJSON('house');
	this.room = this.house[`room${data.room}`];
};

PlayState.create = function () {
	// create key bindings
	this.keys = game.input.keyboard.addKeys({
		left: Phaser.KeyCode.LEFT,
		right: Phaser.KeyCode.RIGHT,
		boost: Phaser.KeyCode.Z,
		shoot: Phaser.KeyCode.X
	});

	// create sfx
	// create HUD
	// create room
	this._loadRoom(this.room);
	//game.camera.flash('#000000');
	this.player = new Player(game, this.room.player.x, this.room.player.y);
	game.add.existing(this.player);
	this.player.spawn();
};

PlayState.update = function () {
	this._handleInput();
	this._handleCollisions();
};

PlayState._loadRoom = function (data) {
	// create groups and layers
	this.background = game.add.group();
	this.obstacles = game.add.group();

	data.background.slices.forEach(function (i) {
		this.background.add(game.add.sprite(64 * i, 0, `background:${data.background.style}`, data.background.slices[i]));
	}, this);
};

PlayState._handleInput = function () {
	// move player left
	if (this.keys.left.isDown) {
		this.player.move(-1);
	}
	// move player right
	else if (this.keys.right.isDown) {
		this.player.move(1);
	}
	// do not move the player left or right
	else {
		this.player.move(0);
	}
	// boost
	this.player.boosting = this.keys.boost.isDown;
};

PlayState._handleCollisions = function () {
	this.obstacles.forEach(this._checkOverlap, this);
};

PlayState._checkOverlap = function (item) {
	let pBounds = this.player.getBounds();
	let iBounds = item.getBounds();

	return Phaser.Rectangle.intersects(pBounds, iBounds);
};