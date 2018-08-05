"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../assets/Painter/sprites/" + sprite);
    };
    var loadSound = function (sound, looping) {
        return new Sound("../assets/Painter/sounds/" + sound, looping);
    };

    sprites.background = loadSprite("spr_background.jpg");
    sprites.scorebar = loadSprite("spr_scorebar.jpg");
    sprites.basket_img = loadSprite("basket.png");
    sprites.leader_board = loadSprite("leaderBoard.jpg");
    
    sprites.israel_product = loadSprite("israelProduct.jpg");
    sprites.palestine_product = loadSprite("palestineProduct.jpeg");
    sprites.lives = loadSprite("lives.png");
    if (Touch.isTouchDevice)
        sprites.gameover = loadSprite("spr_gameover_tap.png");
    else
        sprites.gameover = loadSprite("spr_gameover_click.png");

    sounds.music = loadSound("snd_music");
    sounds.collect_points = loadSound("snd_collect_points");
    
    
};

Game.initialize = function () {
    // sound
    sounds.music.volume = 0.9;
    sounds.music.play();

    // create the game world
    Game.gameWorld = new PainterGameWorld();
};