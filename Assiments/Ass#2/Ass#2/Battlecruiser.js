"use strict";

function Battlecruiser() {
    this.position = new Vector2(Canvas2D.canvas.width/2, Canvas2D.canvas.height - 100);
    this.origin = new Vector2(34, 34);
    this.img = sprites.cannon_barrel ;
    this.velocity = Vector2.zero;
    this.rotation = 0;
    this.speed = 10;
    this.visible = true;
    
}

Object.defineProperty(Battlecruiser.prototype, "colorSelectRectangle",
    {
        get: function () {
            return new Rectangle(this.position.x - this.origin.x, this.position.y - this.origin.y,
                sprites.cannon_barrel.height, sprites.cannon_barrel.height);
        }
    });
Object.defineProperty(Battlecruiser.prototype, "width",
    {
        get: function () {
            return this.img.width;
        }
    });

Object.defineProperty(Battlecruiser.prototype, "height",
    {
        get: function () {
            return this.img.height;
        }
    });

Object.defineProperty(Battlecruiser.prototype, "size",
    {
        get: function () {
            return new Vector2(this.img.width, this.img.height);
        }
    });

Object.defineProperty(Battlecruiser.prototype, "center",
    {
        get: function () {
            return new Vector2(this.img.width / 2, this.img.height / 2);
        }
    });

Object.defineProperty(Battlecruiser.prototype, "ballPosition",
    {
        get: function () {
            var opposite = Math.sin(this.rotation) * sprites.cannon_barrel.width * 0.6;
            var adjacent = Math.cos(this.rotation) * sprites.cannon_barrel.width * 0.6;
            return new Vector2(this.position.x + adjacent, this.position.y + opposite);
        }
    });


Battlecruiser.prototype.reset = function () {
    this.position = new Vector2(Canvas2D.canvas.width/2, Canvas2D.canvas.height - 100);
};

Battlecruiser.prototype.handleInput = function (delta) {
    if (Touch.isTouchDevice)
        this.handleInputTouch(delta);

    else 
        this.handleInputKeybord();

};
Battlecruiser.prototype.handleInputTouch = function (delta) {
    
    if (Touch.isTouching) {
        var touchPos = Touch.getPosition(0);
        this.position.x = touchPos.x;
        this.position.y = touchPos.y;
    }
}
Battlecruiser.prototype.handleInputKeybord = function (delta) {
    if (Keyboard.keyDown === Keys.left && this.position.x > 0)
        this.position.x = this.position.x -this.speed;
    if (Keyboard.keyDown === Keys.right && this.position.x < Canvas2D.canvas.width-this.width/2)
        this.position.x = this.position.x +this.speed;
    if (Keyboard.keyDown === Keys.up && this.position.y >0)
        this.position.y = this.position.y -this.speed;
    if (Keyboard.keyDown === Keys.down && this.position.y < Canvas2D.canvas.height-this.height/2)
        this.position.y = this.position.y +this.speed;
}



Battlecruiser.prototype.update = function (delta) {
    //this.position.addTo(this.velocity.multiply(delta));
};

Battlecruiser.prototype.draw = function () {
    if (!this.visible)
        return;
    var colorPosition = this.position.subtract(this.size.divideBy(2));
    Canvas2D.drawImage(sprites.cannon_barrel, this.position, 0, 1, this.origin);
};