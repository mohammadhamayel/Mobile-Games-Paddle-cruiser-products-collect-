"use strict";

var gift = {
	
};


gift.initialize = function() {
	gift.position = {x:100, y:200};
	
	gift.big = new Image();
	gift.big.src = "sprites/gift.png";

	gift.small = new Image();
	gift.small.src = "sprites/gift2.png";

	gift.show= true ;
	gift.rand = Math.random()*3;
	gift.currentsprite = gift.small;
	gift.layout = {dx1 :100 , dx2: Canvas2D.canvas.width+60 ,dy : Math.random()*3 }; //change gift location
	console.log("initialization gift");

};

	

gift.draw = function () {
	Canvas2D.drawImage(gift.currentsprite , gift.position , 0, {x:gift.big.width/2 , y:gift.big.height/2 });

	
};

gift.update = function (n,m) {

	if( gift.rand<2 && gift.show){
		gift.currentsprite = gift.big;
	}
	else if ( gift.rand>=2 && gift.show){
		gift.currentsprite = gift.small;
	}

	gift.position  = {x:n, y:m};


	//change paddle proparity when it get the gift
	if (gift.position.y>paddle.paddleY && gift.position.y<paddle.paddleY+paddle.paddleHeight && gift.position.x <Canvas2D.canvas.width/4 && gift.show) {
		gift.show = false ;
		paddle.paddleHeight = 150;
		setInterval(gift.restore , 10000);
		console.log("paddle 1111");
	}

	//change paddle proparity when it get the gift
	if (gift.position.y>paddle.paddle2Y && gift.position.y<paddle.paddle2Y+paddle.paddleHeight2 && gift.position.x >Canvas2D.canvas.width/2 && gift.show) {
		gift.show = false ;
		paddle.paddleHeight2 = 150;
		setInterval(gift.restore2, 10000);
		console.log("paddle 2222");

	}


};

gift.restore = function(){//reset paddle1
	var i =0 ;
	while (i < 10) {
	   paddle.paddleHeight = 100;
	   paddle.paddleHeight = 150;
	    i++;
	}
	paddle.paddleHeight = 100;
};


gift.restore2 = function(){ // reset paddle2
	var i =0 ;
	while (i < 10) {
	    paddle.paddleHeight2 = 100;
	    paddle.paddleHeight2 = 150;
	    i++;
	}
	paddle.paddleHeight = 100;
};


gift.values = function(){// display gift
	gift.show= true ;
	gift.rand = Math.random()*3;
	gift.layout.dy = Math.random()*400 +50;

	if(gift.rand<2)
		gift.layout.dx1 = gift.layout.dx1 ;
	else if (gift.rand>2) 
		gift.layout.dx1 = gift.layout.dx2;

	console.log(gift.rand);
};

setInterval(gift.values, 30000);


