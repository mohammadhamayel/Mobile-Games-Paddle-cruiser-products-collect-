"use strict";

function Canvas2D_Singleton() {
    console.log("Creating Canvas2D object");
    this.canvas = null;
    this.canvasContext = null;
}

Canvas2D_Singleton.prototype.initialize = function (canvasName) {
    this.canvas = document.getElementById(canvasName);

    if (this.canvas.getContext)
        this.canvasContext = this.canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
    }
};

Canvas2D_Singleton.prototype.clear = function () {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        sprite.width, sprite.height * scale);
    this.canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawImageEnemy = function (sprite, position, rotation, scale, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        60, 150);
    this.canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawImageLives = function (sprite, position, rotation, scale, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        35, 65);
    this.canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function (text, position, color, textAlign, fontname, fontsize) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.textBaseline = 'top';
    this.canvasContext.font = fontsize + " " + fontname;
    this.canvasContext.fillStyle = color.toString();
    this.canvasContext.textAlign = textAlign;
    this.canvasContext.fillText(text, 0, 0);
    this.canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();