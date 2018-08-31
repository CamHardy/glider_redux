// main.js
'use strict';

const WIDTH = 512;
const HEIGHT = 342;
const RENDERER = Phaser.AUTO;
const DOM_PARENT = 'container';
const DEFAULT_STATE = 'load';
const TRANSPARENT = true;
const ANTIALIAS = false;

let game = new Phaser.Game(WIDTH, HEIGHT, RENDERER, DOM_PARENT, DEFAULT_STATE, TRANSPARENT, ANTIALIAS);

game.state.add('play', PlayState);
game.state.add('load', LoadState);