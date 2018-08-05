"use strict";

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
    paddle.downPressed = false;
    paddle.upPressed = false;
    paddle.downPressed2 = false;
    paddle.upPressed2 = false;
}

var Keyboard = { keyDown : -1 };

Keyboard.initialize = function () {
	console.log("Keyboard.initialize ");
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
};