"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../assets/Battle/sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("../assets/Battle/sounds/" + sound, looping);
    };

    sprites.background = loadSprite("ram_aras.png");
    sprites.scorebar = loadSprite("spr_scorebar.jpg");
    sprites.cannon_barrel = loadSprite("battlecruiser.gif"); //battlecruiser 
    sprites.but_laser = loadSprite("laser.gif");      // fire
    sprites.but_enemy1 = loadSprite("enemy1.gif");      //put enemy1 here
    sprites.but_enemy2 = loadSprite("enemy2.gif");  //put enemy2 here
    sprites.but_enemy3 = loadSprite("enemy3.gif");     //put enemy3 here
    sprites.lives = loadSprite("mutalisk.gif");            //lives
    sprites.gameover = loadSprite("spr_gameover_click.png");

    sounds.music = loadSound("death_explode");
    sounds.die = loadSound("death_explode");
    sounds.collect_points = loadSound("laser_explosion");
    sounds.shoot_paint = loadSound("laser");
};

Game.initialize = function () {

    sounds.music.volume = 0.5;
    //sounds.music.play();
    Game.gameWorld = new PainterGameWorld();
};