"use strict";

function PainterGameWorld() {
    this.basket = new Basket();

    this.prd1 = new Product(Math.floor(Math.random()*780));
    this.prd2 = new Product(Math.floor(Math.random()*780));
    this.prd3 = new Product(Math.floor(Math.random()*780));

    this.PP = 0;//Palestinian Product
    this.IP=0; //Israeli Product
    this.lives = 1;
    this.level=1 ;
    this.NameA="m7md" ; //leader board score 1
    this.NameB="ali" ; //leader board score 2
    this.NameC="r3d" ; //leader board score 3
    this.scoreA = 0 ;
    this.scoreB = 0 ;
    this.scoreC = 0 ;
    
}

PainterGameWorld.prototype.handleInput = function (delta) {
    if (this.lives > 0) {
        this.basket.handleInput(delta);
    }
    else {
        if (Mouse.leftPressed)
            this.reset();
    }

};

PainterGameWorld.prototype.update = function (delta) {
    if (this.lives <= 0)
        return;
    this.basket.update(delta);
    this.prd1.update(delta);
    this.prd2.update(delta);
    this.prd3.update(delta);
    
};
var Name; // get user name
PainterGameWorld.prototype.draw = function () {

    Canvas2D.drawImage(sprites.background);

    Canvas2D.drawImage(sprites.scorebar, new Vector2(10, 10));
    Canvas2D.drawImage(sprites.scorebar, new Vector2(Canvas2D.canvas.width-240, 10));
    for (var i = 0; i < this.lives; i++) {
        Canvas2D.drawImage(sprites.lives, new Vector2(i * 35 + 15, 60),0 ,1 ,new Vector2(20, 0) ,35,62);
    }
    //console.log(Canvas2D.canvas.width);
    Canvas2D.drawText("Paletine: " + this.PP, new Vector2(20, 22), Color.white);
    Canvas2D.drawText("Israel: " + this.IP, new Vector2(Canvas2D.canvas.width-210, 22), Color.white);

    Canvas2D.drawText("Your are in level " + this.level, new Vector2(Canvas2D.canvas.width/4, 10), Color.yellow, "top", "Courier New", "30px");


    if (Math.floor(this.prd1.velocity.y/100) > this.level) {//Alert the player with the level number
        ++this.level ;
        Canvas2D.drawText("Your are in level " + this.level, new Vector2(Canvas2D.canvas.width/4, 10), Color.yellow, "top", "Courier New", "30px");
    }


    this.prd1.draw();
    this.prd2.draw();
    this.prd3.draw();
    this.basket.draw();

    
    if (this.lives <= 0) {
        Canvas2D.drawImage(sprites.gameover,
            new Vector2(Game.size.x - sprites.gameover.width,
                Game.size.y - sprites.gameover.height).divideBy(2));
        if (this.PP > this.IP)
            Canvas2D.drawText("You Servive  " + this.PP +" of Palestinian People", new Vector2(Canvas2D.canvas.width/6, Canvas2D.canvas.height/1.9), Color.red,"top","Courier New","30px");
        else
            Canvas2D.drawText("You killed " + this.IP+" of Palestinian People", new Vector2(Canvas2D.canvas.width/6, Canvas2D.canvas.height/1.9), Color.red, "top", "Courier New", "30px");
        
        if (input==true){
            Name = getName();
            alert(Name);
        } 
        if (this.PP > this.scoreA){
            this.scoreC = this.scoreB ;
            this.NameC = this.NameB ;
            this.scoreB = this.scoreA ;
            this.NameB = this.NameA ;
            this.scoreA = this.PP ;
            this.NameA = Name ;

            
        }
        if (this.PP > this.scoreB && this.PP< this.scoreA){
            this.NameC= this.NameB ;
            this.scoreC=  this.scoreB ;
            this.scoreB = this.PP;
            this.NameB=  Name ;
            
        }
        if (this.PP > this.scoreC && this.PP < this.scoreB){
            this.scoreC = this.PP;
            this.NameC = Name ;
        }
        //draw on leader board
        Canvas2D.drawImage(sprites.leader_board,new Vector2(300, 20),0,1,new Vector2(0, 0)); //leader board
        Canvas2D.drawText("1: " + this.NameA, new Vector2(310, 45), Color.white);
        Canvas2D.drawText("2: " + this.NameB, new Vector2(310, 70), Color.white);
        Canvas2D.drawText("3: " + this.NameC, new Vector2(310, 100), Color.white);
    }
    
};

PainterGameWorld.prototype.reset = function () {
    this.lives = 3;
    this.level=1 ;
    this.input = true;
    this.PP=0;
    this.IP = 0 ;
    this.basket.reset();
    this.prd1.reset();
    this.prd2.reset();
    this.prd3.reset();
};
var input = true;
function getName() {
    input = false ;
    var txt;
    var person = prompt("Enter your name for leaderBoard:","mohammad");
    if (person == null || person == "") {
        txt = "User cancelled the prompt.";
    } else {
        txt = "Hello " + person + "! How are you today?";
    }
    
    return person ;
}

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y-this.prd1.height/2;
};