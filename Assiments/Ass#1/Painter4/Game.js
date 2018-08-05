"use strict";

window.requestAnimationFrame =  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var Game = {
    spritesStillLoading : 0,
    gameWorld : undefined
}

Game.start = function (canvasName, x, y) {
	console.log("initialization game world");
    Canvas2D.initialize(canvasName);
    Game.size = { x : x, y : y };
    
    Game.assetLoadingLoop();
};

Game.loadAssets = function () {
};


Game.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    image.onload = function () {
    };
    return image;
};

Game.assetLoadingLoop = function () {
	console.log("asset loading");
  /*  if (!Game.spritesStillLoading > 0){ //chaged to zero
		console.log("asset loading111111");
        window.requestAnimationFrame(Game.assetLoadingLoop);
	}
    else { */
        Game.initialize();
        window.requestAnimationFrame(Game.mainLoop);
    //}
};

Game.mainLoop = function () {
    var delta = 1 / 60;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
};

