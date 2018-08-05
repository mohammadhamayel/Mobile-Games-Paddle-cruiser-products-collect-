"use strict";

function Laser() {
    this.laser = sprites.but_laser;
    this.position = Vector2.zero;
    this.origin = Vector2.zero;
    this.rotation = 0;
    this.shooting = false;
    this.readyToShoot = false;
    this.reset();
}

Object.defineProperty(Laser.prototype, "width",
    {
        get: function () {
            return this.laser.width;
        }
    });

Object.defineProperty(Laser.prototype, "height",
    {
        get: function () {
            return this.laser.height;
        }
    });

Object.defineProperty(Laser.prototype, "size",
    {
        get: function () {
            return new Vector2(this.laser.width, this.laser.height);
        }
    });

Object.defineProperty(Laser.prototype, "center",
    {
        get: function () {
            return new Vector2(this.laser.width / 2, this.laser.height / 2);
        }
    });

Laser.prototype.handleInput = function (delta) {
    if (Touch.isTouchDevice)
        this.handleInputTouch(delta);
    else 
        this.handleInputKeybord(delta);

};
Laser.prototype.handleInputKeybord = function (delta) {
    if (Keyboard.keyDown === Keys.space && !this.shooting) {
        this.shooting = true;
        sounds.shoot_paint.play();
    }
};


Laser.prototype.handleInputTouch = function (delta) {
    if (Touch.isTouching && !Touch.containsTouch(Game.gameWorld.battlecruiser.colorSelectRectangle)) {
        this.lastTouchPosition = Touch.getPosition(0).copy();
        this.readyToShoot = true;
    }
    if (!Touch.isTouching && this.readyToShoot && !this.shooting) {
        this.shooting = true;
        this.readyToShoot = false;
        sounds.shoot_paint.play();
        this.velocity = this.lastTouchPosition.subtract(this.position).multiplyWith(1.2);
    }
};

Laser.prototype.update = function (delta) {

    if (this.shooting) {
        this.position.y = this.position.y-7;
    }
    else {
        this.position = Game.gameWorld.battlecruiser.position.add(this.size);
        this.position.y-= 50;
    }
    if (Game.gameWorld.isOutsideWorld(this.position) || this.position.y<0)
        this.reset();
};

Laser.prototype.reset = function () {
    this.position = Vector2.zero;
    this.shooting = false;
};

Laser.prototype.draw = function () {
    if (this.shooting)
        Canvas2D.drawImage(this.laser, this.position, this.rotation, 1, this.origin);
};