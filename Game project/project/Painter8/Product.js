"use strict";

function Product(xPosition) {

    this.currentColor = sprites.israel_product;
    this.velocity = Vector2.zero;
    this.position = new Vector2(xPosition, -200);
    this.origin = Vector2.zero;
    this.reset();
    this.country = undefined;
}

Object.defineProperty(Product.prototype, "type",
    {
        get: function () {
            if (this.currentColor === sprites.israel_product)
                return "israel";
            else 
                return "palestine";
           
        },
        set: function (value) {
            if (value === "israel")
                this.currentColor = sprites.israel_product;
            else 
                this.currentColor = sprites.palestine_product;
            
        }
    });

Object.defineProperty(Product.prototype, "width",
    {
        get: function () {
            return 35;
        }
    });

Object.defineProperty(Product.prototype, "height",
    {
        get: function () {
            return 63;
        }
    });

Object.defineProperty(Product.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });

Object.defineProperty(Product.prototype, "center",
    {
        get: function () {
            return new Vector2(this.currentColor.width / 2, this.currentColor.height / 2);
        }
    });

Product.prototype.reset = function () {
    this.moveToTop();
    this.minVelocity = 50;
};

Product.prototype.moveToTop = function () {
    this.position.y = -200;
    this.velocity = Vector2.zero;
};

Product.prototype.update = function (delta) {
    //console.log(Game.gameWorld.basket.position);

    this.position.addTo(this.velocity.multiply(delta));

    if (this.velocity.y === 0 && Math.random() < 0.01) {
        this.velocity = this.calculateRandomVelocity();
        this.type = this.getRandomProduct();
        sounds.music.play();

    }
    
    // calculate the distance between this product and the basket
   if (this.position.x > Game.gameWorld.basket.position.x-Game.gameWorld.basket.origin.x && this.position.x < Game.gameWorld.basket.position.x+Game.gameWorld.basket.origin.x/2 &&this.position.y>Game.gameWorld.basket.position.y-this.height &&this.position.y<Game.gameWorld.basket.position.y+Game.gameWorld.basket.height/4) {
        if (this.country=="palestine")
            Game.gameWorld.PP += 1;
        if (this.country=="israel") 
            Game.gameWorld.IP += 1;
        sounds.collect_points.play();
        
        this.moveToTop();

   }

    if (Game.gameWorld.isOutsideWorld(this.position)) {
        if (Game.gameWorld.PP > Game.gameWorld.IP && this.country == "palestine") 
            Game.gameWorld.lives -= 1;

        if (Game.gameWorld.PP < Game.gameWorld.IP && this.country == "israel") 
            Game.gameWorld.lives -= 1;

        this.moveToTop();
    }
    this.minVelocity += 0.07;
};

Product.prototype.draw = function () {
    Canvas2D.drawImage(this.currentColor, this.position, this.rotation, 1, this.origin ,this.width,this.height);
};

Product.prototype.calculateRandomVelocity = function () {
    return new Vector2(0, Math.random() * 50 + this.minVelocity);
};

Product.prototype.getRandomProduct = function () {//detection products
    var randomval = Math.floor(Math.random() * 2);
    this.position.x = Math.random()*780;
    if (randomval == 0){
        this.country = "israel";
        return "israel";
    }
    else {
        this.country = "palestine";
        return "palestine";
    }
   
};