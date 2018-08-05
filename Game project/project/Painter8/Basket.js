"use strict";

function Basket() {
    this.position = new Vector2(400, 480-15);
    this.origin = new Vector2(76, 30);
    this.img = sprites.basket_img;
    this.velocity = Vector2.zero;
    this.visible = true;
    this.speed =10;
    
}


Object.defineProperty(Basket.prototype, "width",
    {
        get: function () {
            return this.img.width;
        }
    });

Object.defineProperty(Basket.prototype, "height",
    {
        get: function () {
            return this.img.height;
        }
    });

Object.defineProperty(Basket.prototype, "size",
    {
        get: function () {
            return new Vector2(this.img.width, this.img.height);
        }
    });

Object.defineProperty(Basket.prototype, "center",
    {
        get: function () {
            return new Vector2(this.img.width / 2, this.img.height / 2);
        }
    });




Basket.prototype.reset = function () {
    this.position = new Vector2(800, 480-15);
};

Basket.prototype.handleInput = function (delta) {
    if (Touch.isTouchDevice){
        this.handleInputTouch(delta);
    }

     
    this.handleInputKeybord(delta);


}
Basket.prototype.handleInputKeybord = function (delta) {
    if (Keyboard.keyDown === Keys.right  && this.position.x< Canvas2D.canvas.width- this.width/3)
        this.position.x  = this.position.x + this.speed;
    else if (Keyboard.keyDown === Keys.left && this.position.x>0)
        this.position.x  = this.position.x - this.speed;

   
};
Basket.prototype.handleInputTouch = function (delta) {
    
    if (Touch.isTouching) {
        var touchPos = Touch.getPosition(0);
        if (touchPos.x>0 && touchPos.x< Canvas2D.canvas.width) 
            this.position.x = touchPos.x;
    }
}

Basket.prototype.update = function (delta) {
    this.position.addTo(this.velocity.multiply(delta));

};

Basket.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(sprites.basket_img, this.position, 0, 1, this.origin);
};