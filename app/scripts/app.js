var GameOfLife = require('./game-of-life');

const canvas = document.getElementById('gol');
const start = document.getElementById('start');
const speed = document.getElementById('speed');
const clear = document.getElementById('clear');

let game = new GameOfLife(canvas);

var drawing = false;
var drawMode = false;

canvas.onmousedown = function(e){
    drawing = true;
    let x = parseInt(e.offsetX / 10);
    let y = parseInt(e.offsetY / 10);
    drawMode = !game.isAlive(x, y);
}

canvas.onmouseup = function(){
    drawing = false;
}

canvas.onmousemove = function(e){
    if(!drawing){
        return;
    }
    let x = parseInt(e.offsetX / 10);
    let y = parseInt(e.offsetY / 10);
    game.set(x, y, drawMode);
}

speed.onchange = function(){
    game.setSpeed(parseInt(this.value));
}

start.onclick = function(){
    if(this.innerText === 'Start'){
        game.start();
        start.innerText = 'Pause';
    } else {
        game.pause();
        start.innerText = 'Start';
    }
}

clear.onclick = function(){
    game.reset();
}
