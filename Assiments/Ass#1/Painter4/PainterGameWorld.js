"use strict";

var painterGameWorld = {
};

painterGameWorld.handleInput = function (delta) {
    paddle.handleInput(delta);
    ball.handleInput();

};

painterGameWorld.update = function (delta) {
    ball.update();
    
    paddle.update();

    
    gift.update(gift.layout.dx1,gift.layout.dy);

};

painterGameWorld.draw = function () {
    Canvas2D.draw();
    ball.draw();
    paddle.drawPaddle(paddle.paddleX,paddle.paddleY ,paddle.paddleHeight) ; //paddle 1 

    paddle.drawPaddle(paddle.paddle2X,paddle.paddle2Y ,paddle.paddleHeight2 ) ; // paddle 2

    if(gift.show)
        gift.draw();
};

painterGameWorld.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
};

