"use strict";

var sprites = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../../assets/Painter/sprites/" + sprite);
    };

    sprites.background = loadSprite("spr_background.jpg");

};

Game.initialize = function () {

    console.log("Creating game world");
    //cannon.initialize();
    ball.initialize();

    paddle.initialize();
    Keyboard.initialize();
    
    gift.initialize();

    console.log("after  gift.initialize");
    Game.gameWorld = painterGameWorld;

};