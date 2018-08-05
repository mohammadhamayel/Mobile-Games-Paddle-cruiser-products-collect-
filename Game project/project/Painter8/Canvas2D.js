"use strict";

function Canvas2D_Singleton() {
    console.log("Creating Canvas2D object");
    this.canvas = null;
    this.canvasContext = null;
}

Canvas2D_Singleton.prototype.initialize = function (divName,canvasName) {
    this.canvas = document.getElementById(canvasName);
    this._div = document.getElementById(divName);

    if (this.canvas.getContext)
        this.canvasContext = this.canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
    }

    window.onresize = Canvas2D_Singleton.prototype.resize;
    this.resize();

};

Canvas2D_Singleton.prototype.clear = function () {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
Canvas2D_Singleton.prototype.resize = function () {
    var gameCanvas = Canvas2D.canvas;
    var gameArea = Canvas2D._div;
    var widthToHeight = Game.size.x / Game.size.y;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }
    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';

    gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
    gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;

    var offset = Vector2.zero;
    if (gameCanvas.offsetParent) {
        do {
            offset.x += gameCanvas.offsetLeft;
            offset.y += gameCanvas.offsetTop;
        } while ((gameCanvas = gameCanvas.offsetParent));
    }
    Canvas2D._canvasOffset = offset;
};
Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin, widthdraw, heightdraw) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    widthdraw = typeof widthdraw !== 'undefined' ? widthdraw : sprite.width;
    heightdraw = typeof heightdraw !== 'undefined' ? heightdraw : sprite.height;

    this.canvasContext.save();
    //this.canvasContext.scale(canvasScale.x, canvasScale.y);
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        widthdraw * scale, heightdraw * scale);
    this.canvasContext.restore();
};

/*Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin, widthdraw, heightdraw) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    widthdraw = typeof widthdraw !== 'undefined' ? widthdraw : sprite.width;
    heightdraw = typeof heightdraw !== 'undefined' ? heightdraw : sprite.height;

    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        widthdraw, heightdraw * scale);
    this.canvasContext.restore();
};*/

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

    this.canvasContext.shadowColor = Color.red.toString();;
    this.canvasContext.shadowBlur=11;
    this.canvasContext.strokeText(text, 0, 5);

    this.canvasContext.fillText(text, 0, 5);
    this.canvasContext.restore();
    

};

var Canvas2D = new Canvas2D_Singleton();