"use strict";

var paddle = {


};

paddle.initialize = function (){
	console.log("paddle initialize");
	paddle.paddleHeight = 100;
	paddle.paddleHeight2 = 100;
    paddle.paddleWidth = 10;
    paddle.speed = 7;

    paddle.paddleX = 10 ;
    paddle.paddleY = (Canvas2D.canvas.height- paddle.paddleHeight)/2;//paddle 1  movement

    paddle.paddle2X = (Canvas2D.canvas.width- 20);
    paddle.paddle2Y = (Canvas2D.canvas.height- paddle.paddleHeight2)/2;//paddle 2  movement

    paddle.downPressed = false;// paddle 1 keys
    paddle.upPressed = false;

    paddle.downPressed2 = false;//paddle 2 keys
    paddle.upPressed2 = false;

};

paddle.drawPaddle = function (x,y,paddleH) {

    Canvas2D.canvasContext.beginPath();
    Canvas2D.canvasContext.rect(x,y, paddle.paddleWidth, paddleH);
    Canvas2D.canvasContext.fillStyle = "#0095DD";
    Canvas2D.canvasContext.fill();
    Canvas2D.canvasContext.closePath();
};

paddle.handleInput = function(){

	if (Keyboard.keyDown === Keys.S) // paddle 1 handle input
        paddle.downPressed = true;
    
    else if(Keyboard.keyDown === Keys.W) {
        paddle.upPressed = true;

    }

    if (Keyboard.keyDown === Keys.down)// paddle 2 handle input
        paddle.downPressed2 = true;
    
    else if(Keyboard.keyDown === Keys.up) {
        paddle.upPressed2 = true;

    }
    if(Keyboard.keyDown === Keys.enter)// set paddle position when start next level
    	paddle.reset();
};

paddle.update = function (){

	if (ball.moving) {//when pall out paddles don't move
	
		if(paddle.downPressed && paddle.paddleY < Canvas2D.canvas.height-paddle.paddleHeight) { //paddle 1 speed
		    paddle.paddleY += paddle.speed ;
		}
		else if(paddle.upPressed && paddle.paddleY > 0) {
		    paddle.paddleY -= paddle.speed ;
		}

		if(paddle.downPressed2 && paddle.paddle2Y < Canvas2D.canvas.height-paddle.paddleHeight2) { //paddle 2 speed
		    paddle.paddle2Y += paddle.speed ;
		}
		else if(paddle.upPressed2 && paddle.paddle2Y > 0) {
		    paddle.paddle2Y -= paddle.speed ;
		}
	}
	if (ball.layout.dx>8|| ball.layout.dx<-8) { // change paddle speed when ball get faster
		paddle.speed = 10;
	}else if (ball.layout.dx>13|| ball.layout.dx<-13) {
		paddle.speed = 15;
	}
};

paddle.reset = function(){

	paddle.paddleX = 10 ;
    paddle.paddleY = (Canvas2D.canvas.height- paddle.paddleHeight)/2;
    paddle.speed = 7;
    paddle.paddle2X = (Canvas2D.canvas.width- 20);
    paddle.paddle2Y = (Canvas2D.canvas.height- paddle.paddleHeight2)/2;

};