"use strict";

function Enemy(xPosition) {
    this.currentEnemy = sprites.but_enemy1;
    this.velocity = Vector2.zero;
    if (xPosition>750) {xPosition=770}
    this.position = new Vector2(xPosition, -200);
    this.origin = Vector2.zero;
    this.minVelocity = 30;
    this.powerFactor = 1; //to give the enemy different abilities
    this.lives = 1;
    this.reset();
    
}

Object.defineProperty(Enemy.prototype, "enemy",
    {
        get: function () {
            if (this.currentEnemy === sprites.but_enemy1)
                return Color.red;
            else if (this.currentEnemy === sprites.but_enemy2)
                return Color.green;
            else
                return Color.blue;
        },
        set: function (value) {
            if (value === "enemy1")
                this.currentEnemy = sprites.but_enemy1;
            else if (value === "enemy2")
                this.currentEnemy = sprites.but_enemy2;
            else if (value === "enemy3")
                this.currentEnemy = sprites.but_enemy3;
        }
    });
Object.defineProperty(Enemy.prototype, "power",
    {
        get: function () {
            return this.lives*this.powerFactor;
        }
    });

Object.defineProperty(Enemy.prototype, "width",
    {
        get: function () {
            return 60;
        }
    });

Object.defineProperty(Enemy.prototype, "height",
    {
        get: function () {
            return 150;
        }
    });

Object.defineProperty(Enemy.prototype, "size",
    {
        get: function () {
            return new Vector2(this.width, this.height);
        }
    });

Object.defineProperty(Enemy.prototype, "center",
    {
        get: function () {
            return new Vector2(this.width / 2, this.height / 2);
        }
    });

Enemy.prototype.reset = function () {
    this.moveToTop();
    this.minVelocity = 30;
    this.maxSpeed=true;
};

Enemy.prototype.moveToTop = function () {
    this.position.y = -200;
    this.velocity = Vector2.zero;
};

Enemy.prototype.update = function (delta) {
    this.position.addTo(this.velocity.multiply(delta));

    if (this.velocity.y === 0 && Math.random() < 0.01) {
        this.velocity = this.calculateRandomVelocity();
        this.enemy = this.calculateRandomEnemy();
        console.log(this.velocity);
    }
    if(this.position.x-this.center.x < 0 || this.position.x+this.center.x>Game.size.x){
        this.velocity.x = - this.velocity.x;
    }
    // calculate the distance between enemy and the laser
    var laser_center = Game.gameWorld.laser.center;
    var laser_position = Game.gameWorld.laser.position;
    var distance = laser_position.add(laser_center).subtractFrom(this.position).subtractFrom(this.center);

    if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
        Game.gameWorld.laser.reset();
        this.lives-=1;
        if (this.lives<1) {
            this.reset();
            Game.gameWorld.score += (10 * this.powerFactor);
            sounds.collect_points.play();
        }
    }
    //increase velocity depend on power and type of move
    if (this.power >1 && this.power<4 && this.maxSpeed) {
        this.maxSpeed= false;
        this.minVelocity =30;
        this.velocity.y =30;
        this.velocity.x+= 40;
        console.log(this.minVelocity);
    }

    // battlecruiser collision with enemy
    var bat_canter = Game.gameWorld.battlecruiser.center;
    var bat_position = Game.gameWorld.battlecruiser.position;
    var cur_distance = bat_position.add(bat_canter).subtractFrom(this.position).subtractFrom(this.center);
        
     if (Math.abs(cur_distance.x) < this.width && Math.abs(cur_distance.y) < this.height) {
        this.reset();
        Game.gameWorld.lives -= 1;
        sounds.die.play();
    }


    //circular move
     if (this.randommove==1) {
        this.position = this.calculateRandomVelocityCircle();
    }
    


    if (Game.gameWorld.isOutsideWorld(this.position)) {
        
        Game.gameWorld.lives -= 1;
        this.moveToTop();
    }
    this.minVelocity += 0.01;
};

Enemy.prototype.draw = function () {
    Canvas2D.drawImageEnemy(this.currentEnemy, this.position, this.rotation, 1, this.origin);
};

Enemy.prototype.calculateRandomVelocity = function () {//check type of motion
    return new Vector2(-Math.random() *100, Math.random() * 30 + this.minVelocity);
};

var step = 0, radius = 80, speed = 0.006;

Enemy.prototype.calculateRandomVelocityCircle = function () {
    

    
    this.position.x = 300 + radius * Math.cos(speed * step) ;
    this.position.y = 100 + radius * Math.sin(speed * step);
    ++step;

    console.log(this.position);
    return new Vector2(this.position.x, this.position.y);
    
};

Enemy.prototype.calculateRandomEnemy = function () {
    var randomval = Math.floor(Math.random() * 3);
    this.randommove = Math.floor(Math.random() * 3);
    if (randomval == 0){
        this.powerFactor=1;
        return "enemy1";
    }
    else if (randomval == 1){
        this.powerFactor=1.5;
        return "enemy2";
    }
    else{
        this.lives = 2;
        this.powerFactor=2;
        this.velocity.y +=50;
        this.velocity.x+= 60
        return "enemy3";
    }
};