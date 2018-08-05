"use strict";

function PainterGameWorld() {
    this.battlecruiser = new Battlecruiser();
    this.laser = new Laser();
    this.laser = new Laser();
    this.enemy1 = new Enemy(Math.random()*800);
    this.enemy2 = new Enemy(Math.random()*800);
    this.enemy3 = new Enemy(Math.random()*800);

    this.lives = 5;
    this.score = 0;
}

PainterGameWorld.prototype.handleInput = function (delta) {
    if (this.lives > 0) {
        this.laser.handleInput(delta);
        this.battlecruiser.handleInput(delta);
    }
    else {
        if (Mouse.leftPressed)
            this.reset();
    }
};

PainterGameWorld.prototype.update = function (delta) {
    if (this.lives <= 0)
        return;
    this.laser.update(delta);
    this.battlecruiser.update(delta);
    this.enemy1.update(delta);
    this.enemy2.update(delta);
    this.enemy3.update(delta);
};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);
    Canvas2D.drawImage(sprites.scorebar, new Vector2(10, 10));
    Canvas2D.drawText("Score: " + this.score, new Vector2(20, 22), Color.white);


    this.laser.draw();
    this.battlecruiser.draw();
    this.enemy1.draw();
    this.enemy2.draw();
    this.enemy3.draw();
    for (var i = 0; i < this.lives; i++) {
        Canvas2D.drawImageLives(sprites.lives, new Vector2(i * 35 + 15, 60));
    }
    if (this.lives <= 0) {
       // console.log("Game over!");
        Canvas2D.drawImage(sprites.gameover,
            new Vector2(Game.size.x - sprites.gameover.width,
                Game.size.y - sprites.gameover.height).divideBy(2));
    }
};

PainterGameWorld.prototype.reset = function () {
    this.lives = 5;
    this.score = 0;
    this.battlecruiser.reset();
    this.laser.reset();
    this.enemy1.reset();
    this.enemy2.reset();
    this.enemy3.reset();
};

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y  ;
};