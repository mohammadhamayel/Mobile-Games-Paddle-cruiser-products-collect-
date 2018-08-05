"use strict";

var ball = {
	
};


ball.initialize = function() {
	ball.position = {x:Canvas2D.canvas.width/2 , y:Math.random()*400};
	ball.ballRadius = 10;
	ball.layout = {dx :3 , dy :-3};
	console.log("initialization ball");
	ball.moving = true; // when ball is out side or to begin the game
	ball.repeat = 3 ; // decrement when ball go out side ... do it for each paddle
	ball.leftSide = 3;
	ball.rightSide = 3;


};

	

ball.draw = function () {
	/*
    Canvas2D.canvasContext.beginPath();   fixed layout
	Canvas2D.canvasContext.arc(50, 50, 10, 0, Math.PI*2);
	Canvas2D.canvasContext.fillStyle = "#0095DD";
	Canvas2D.canvasContext.fill();
	Canvas2D.canvasContext.closePath();
	
	ball.position.x = Canvas2D.canvas.width/2;     // dynamic layout
	ball.position.y = Canvas2D.canvas.height-30;
	*/
	
	Canvas2D.canvasContext.beginPath();
    Canvas2D.canvasContext.arc(ball.position.x, ball.position.y, ball.ballRadius, 0, Math.PI*2);
    Canvas2D.canvasContext.fillStyle = "#6600cc";
    Canvas2D.canvasContext.fill();
    Canvas2D.canvasContext.closePath();
	
	
};

ball.update = function () {
	
	// this under for redirect when crach with paddle on the right and increment ball speed
	if(ball.position.x + ball.layout.dx > Canvas2D.canvas.width-(paddle.paddleWidth+ball.ballRadius) && ball.position.y >paddle.paddle2Y && ball.position.y <paddle.paddle2Y+paddle.paddleHeight) {
    	
    	//ball.layout.dx = -(ball.layout.dx+1); for increment speed
    	//control the angle by increament and decrement ball movement dx,dy

    	if (ball.position.y + ball.layout.dy >paddle.paddle2Y && ball.position.y+ ball.layout.dy <paddle.paddle2Y+(paddle.paddleHeight2/3)) {
    		ball.layout.dy = - (Math.abs(ball.layout.dy)+1);
    		ball.layout.dx = (ball.layout.dx+1);
    	}

    	if (ball.position.y + ball.layout.dy >paddle.paddle2Y+(paddle.paddleHeight2/3) && ball.position.y+ ball.layout.dy <paddle.paddle2Y+(paddle.paddleHeight2/1.33333)) {
    		
    		ball.layout.dx = (ball.layout.dx);
    		ball.layout.dy =  ball.layout.dy-1;    		
    	}

    	if (ball.position.y  >paddle.paddle2Y+(paddle.paddleHeight2/1.33333) && ball.position.y<paddle.paddle2Y+(paddle.paddleHeight2)) {
    		
    		ball.layout.dx = (ball.layout.dx+1);
    		ball.layout.dy =  Math.abs(ball.layout.dy);
    	}
    	
    	 	ball.layout.dx = -(ball.layout.dx);
    	    	
    	console.log(ball.layout.dx ,ball.layout.dy);


	}

	// this under for redirect when crach with paddle on the left and increment ball speed
	if (ball.position.x + ball.layout.dx< paddle.paddleWidth+ball.ballRadius && ball.position.y >paddle.paddleY && ball.position.y <paddle.paddleY+paddle.paddleHeight) {
		
		//ball.layout.dx = -(ball.layout.dx);//ball.layout.dx = -(ball.layout.dx-1);   for increment speed
		//control the angle by increament and decrement ball movement dx,dy

		if (ball.position.y + ball.layout.dy >paddle.paddleY && ball.position.y+ ball.layout.dy <paddle.paddleY+(paddle.paddleHeight/3)) {
    		ball.layout.dy = - (Math.abs(ball.layout.dy));
    		ball.layout.dx = -(ball.layout.dx-1);
    	}

    	if (ball.position.y + ball.layout.dy >paddle.paddleY+(paddle.paddleHeight/3) && ball.position.y+ ball.layout.dy <paddle.paddleY+(paddle.paddleHeight/1.33333)) {
    		
    		ball.layout.dx = -(ball.layout.dx);
    		ball.layout.dy =  ball.layout.dy-1;    		
    	}

    	if (ball.position.y  >paddle.paddleY+(paddle.paddleHeight/1.33333) && ball.position.y<paddle.paddleY+(paddle.paddleHeight)) {
    		
    		ball.layout.dx = -(ball.layout.dx-1);
    		ball.layout.dy =  Math.abs(ball.layout.dy)+1;
    	}
    	
    	//else 	ball.layout.dx = -(ball.layout.dx);
    	    	
    	console.log(ball.layout.dx ,ball.layout.dy);
		

	}

	// this under for redirect ball when crach up and down
	if( ball.position.y + ball.layout.dy < 0 || ball.position.y + ball.layout.dy > Canvas2D.canvas.height) {
		ball.layout.dy = -ball.layout.dy;
	}
	
	if (ball.position.x + ball.layout.dx < 0) {//when ball go out side from left player2 on the right gain one point

		ball.repeat -=1;
		ball.reset();
		ball.moving= false ;
		ball.leftSide -=1;
		//console.log("ball.repeat:",ball.repeat, ", ball.leftSide:",ball.leftSide);
		document.getElementById("leftPlayer").innerHTML = "Player1: "+ball.leftSide;
	}
	if (ball.position.x + ball.layout.dx > Canvas2D.canvas.width-(ball.ballRadius/2)) {//when ball go out side from right player1 on the left gain one point

		ball.repeat -=1;
		ball.reset();
		ball.moving= false ;
		ball.rightSide -=1;
		//console.log("ball.repeat:",ball.repeat, ", ball.leftSide:",ball.rightSide);
		document.getElementById("rightPlayer").innerHTML = "Player2: "+ball.rightSide;
	}

	if (ball.rightSide==0 )// this to show who is the winner 
		document.getElementById("winner").innerHTML = "Player1 win";
	else if(ball.leftSide==0)
		document.getElementById("winner").innerHTML = "Player2 win";
	



	if (ball.moving ) {// moving ball
		ball.position.x += ball.layout.dx;
    	ball.position.y += ball.layout.dy;
	}
	
	
	
};

ball.reset = function (){//reset the ball when it out sides using in update function

	ball.position = {x:Math.random()*750 , y:Canvas2D.canvas.height/2};
	ball.moving=false;
	ball.layout = {dx :3 , dy :-3};

};

ball.handleInput = function (){// this for play game state 

	if (Keyboard.keyDown === Keys.enter && ball.rightSide>0 && ball.leftSide>0)
		ball.moving=true ;

};