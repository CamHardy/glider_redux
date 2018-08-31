// Player.js
'use strict';

function Player(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'player');

	// anchor point
	this.anchor.set(0.5, 0.5);

	// animations
	this.animations.add('forward', [0]);
	this.animations.add('backward', [1]);
	this.animations.add('spawn', [7, 8, 7, 6, 7, 6, 5, 6, 5, 4, 5, 4, 3, 4, 3, 2, 0]);
	this.animations.add('die', [2, 3, 2, 3, 4, 3, 4, 5, 4, 5, 6, 5, 6, 7, 6, 7, 8]);

	this.alive = false;
	this.boosting = false;
	this.SPEED = 2.5;
	this.BOOST = 8;
	this.shadow = game.add.sprite(this.position.x, 330, 'player:shadow');
	this.shadow.anchor.set(0.5, 0.5);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function (dir) {
	// fly
	if (this.alive) {
		if (dir < 0) {
			this.animations.play('backward');
		}
		else this.animations.play('forward');

		this.position.x += dir * (this.boosting ? this.BOOST : this.SPEED);
		this.shadow.position.x = this.position.x;
	}
};

Player.prototype.spawn = function () {
	this.animations.play('spawn', null).onComplete.addOnce(function () {
		this.alive = true;
	}, this);
};

Player.prototype.glide = function () {
	if (this.alive) this.position.y += 1.5;
};

Player.prototype.die = function () {
	this.alive = false;
	this.animations.play('die', null, false, true);
};

Player.prototype.update = function () {
	this.glide();
	if (this.position.y >= 327) this.die();
};