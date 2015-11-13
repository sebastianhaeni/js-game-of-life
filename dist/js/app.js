(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var grid = [];
var doUpdate = false;
var drawing = false;
var drawMode = false;
var lastUpdate = getTime();
var canvas = document.getElementById('gol');
var start = document.getElementById('start');
var speed = document.getElementById('speed');
var clear = document.getElementById('clear');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 1;
ctx.strokeStyle = 'rgba(0, 0, 0, .2)';
window.lastUpdate = lastUpdate;

function getTime(){
    var d = new Date();
    return +d + d.getMilliseconds();
}

function clearGrid(){
    for(var x = 0; x < 80; x++){
        if(grid[x] === undefined){
            grid[x] = [];
        }
        for(var y = 0; y < 80; y++){
            grid[x][y] = false;
        }
    }
}

function drawLines(){
    for(var i = 0; i < 80; i++){
        ctx.beginPath();
        ctx.moveTo(10 * i, 0)
        ctx.lineTo(10 * i, canvas.width);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 10 * i)
        ctx.lineTo(canvas.height, 10 * i);
        ctx.stroke();
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLines();

    var changeset = [];

    for(var x = 0; x < grid.length; x++){
        for(var y = 0; y < grid[x].length; y++){

            if(doUpdate && lastUpdate < getTime() - parseInt(speed.value)){
                lastUpdate = (new Date()).getMilliseconds();
                var neighborCount = getNeighborCount(x, y);
                var change = {
                    x: x,
                    y: y,
                    alive: undefined
                };
                if(grid[x][y]){
                    if(neighborCount < 2){
                        change.alive = false;
                    } else if(neighborCount === 2 || neighborCount === 3){
                        change.alive = true;
                    } else if(neighborCount > 3){
                        change.alive = false;
                    }
                } else {
                    if(neighborCount === 3){
                        change.alive = true;
                    }
                }

                if(change.alive !== undefined){
                    changeset.push(change);
                }
            }

            if(grid[x][y]){
                ctx.fillRect(x * 10, y * 10, 10, 10);
            }
        }
    }

    for(var i = 0; i < changeset.length; i++){
        grid[changeset[i].x][changeset[i].y] = changeset[i].alive;
    }

    setTimeout(update, 16);
}

function getNeighborCount(x, y){
    var neighborCount = 0;

    // top left
    neighborCount += x > 0 && y > 0 && grid[x - 1][y - 1] ? 1 : 0;
    // top middle
    neighborCount += y > 0 && grid[x][y - 1] ? 1 : 0;
    // top right
    neighborCount += x < 79 && y > 0 && grid[x + 1][y - 1] ? 1 : 0;
    // middle left
    neighborCount += x > 0 && grid[x - 1][y] ? 1 : 0;
    // middle right
    neighborCount += x < 79 && grid[x + 1][y] ? 1 : 0;
    // bottom left
    neighborCount += x > 0 && y < 79 && grid[x - 1][y + 1] ? 1 : 0;
    // bottom middle
    neighborCount += y < 79 && grid[x][y + 1] ? 1 : 0;
    // bottom right
    neighborCount += x < 79 && y < 79 && grid[x + 1][y + 1] ? 1 : 0;

    return neighborCount;
}

clearGrid();
update();

canvas.onmousedown = function(e){
    drawing = true;
    var x = parseInt(e.offsetX / 10);
    var y = parseInt(e.offsetY / 10);
    drawMode = !grid[x][y];
}

canvas.onmouseup = function(){
    drawing = false;
}

canvas.onmousemove = function(e){
    if(!drawing){
        return;
    }
    var x = parseInt(e.offsetX / 10);
    var y = parseInt(e.offsetY / 10);
    grid[x][y] = drawMode;
}

start.onclick = function(){
    if(doUpdate){
        doUpdate = false;
        start.innerText = 'Start';
    } else {
        doUpdate = true;
        start.innerText = 'Pause';
    }
}

clear.onclick = function(){
    clearGrid();
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGdyaWQgPSBbXTtcclxudmFyIGRvVXBkYXRlID0gZmFsc2U7XHJcbnZhciBkcmF3aW5nID0gZmFsc2U7XHJcbnZhciBkcmF3TW9kZSA9IGZhbHNlO1xyXG52YXIgbGFzdFVwZGF0ZSA9IGdldFRpbWUoKTtcclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2wnKTtcclxudmFyIHN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Jyk7XHJcbnZhciBzcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGVlZCcpO1xyXG52YXIgY2xlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXInKTtcclxudmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5jdHgubGluZVdpZHRoID0gMTtcclxuY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgLjIpJztcclxud2luZG93Lmxhc3RVcGRhdGUgPSBsYXN0VXBkYXRlO1xyXG5cclxuZnVuY3Rpb24gZ2V0VGltZSgpe1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgcmV0dXJuICtkICsgZC5nZXRNaWxsaXNlY29uZHMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJHcmlkKCl7XHJcbiAgICBmb3IodmFyIHggPSAwOyB4IDwgODA7IHgrKyl7XHJcbiAgICAgICAgaWYoZ3JpZFt4XSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgZ3JpZFt4XSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIHkgPSAwOyB5IDwgODA7IHkrKyl7XHJcbiAgICAgICAgICAgIGdyaWRbeF1beV0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdMaW5lcygpe1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IDgwOyBpKyspe1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKDEwICogaSwgMClcclxuICAgICAgICBjdHgubGluZVRvKDEwICogaSwgY2FudmFzLndpZHRoKTtcclxuICAgICAgICBjdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKDAsIDEwICogaSlcclxuICAgICAgICBjdHgubGluZVRvKGNhbnZhcy5oZWlnaHQsIDEwICogaSk7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKXtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgIGRyYXdMaW5lcygpO1xyXG5cclxuICAgIHZhciBjaGFuZ2VzZXQgPSBbXTtcclxuXHJcbiAgICBmb3IodmFyIHggPSAwOyB4IDwgZ3JpZC5sZW5ndGg7IHgrKyl7XHJcbiAgICAgICAgZm9yKHZhciB5ID0gMDsgeSA8IGdyaWRbeF0ubGVuZ3RoOyB5Kyspe1xyXG5cclxuICAgICAgICAgICAgaWYoZG9VcGRhdGUgJiYgbGFzdFVwZGF0ZSA8IGdldFRpbWUoKSAtIHBhcnNlSW50KHNwZWVkLnZhbHVlKSl7XHJcbiAgICAgICAgICAgICAgICBsYXN0VXBkYXRlID0gKG5ldyBEYXRlKCkpLmdldE1pbGxpc2Vjb25kcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5laWdoYm9yQ291bnQgPSBnZXROZWlnaGJvckNvdW50KHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpdmU6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGlmKGdyaWRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQgPCAyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5laWdoYm9yQ291bnQgPT09IDIgfHwgbmVpZ2hib3JDb3VudCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZS5hbGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5laWdoYm9yQ291bnQgPiAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmFsaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihuZWlnaGJvckNvdW50ID09PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlLmFsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY2hhbmdlLmFsaXZlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZXNldC5wdXNoKGNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGdyaWRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHggKiAxMCwgeSAqIDEwLCAxMCwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGFuZ2VzZXQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIGdyaWRbY2hhbmdlc2V0W2ldLnhdW2NoYW5nZXNldFtpXS55XSA9IGNoYW5nZXNldFtpXS5hbGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZSwgMTYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZWlnaGJvckNvdW50KHgsIHkpe1xyXG4gICAgdmFyIG5laWdoYm9yQ291bnQgPSAwO1xyXG5cclxuICAgIC8vIHRvcCBsZWZ0XHJcbiAgICBuZWlnaGJvckNvdW50ICs9IHggPiAwICYmIHkgPiAwICYmIGdyaWRbeCAtIDFdW3kgLSAxXSA/IDEgOiAwO1xyXG4gICAgLy8gdG9wIG1pZGRsZVxyXG4gICAgbmVpZ2hib3JDb3VudCArPSB5ID4gMCAmJiBncmlkW3hdW3kgLSAxXSA/IDEgOiAwO1xyXG4gICAgLy8gdG9wIHJpZ2h0XHJcbiAgICBuZWlnaGJvckNvdW50ICs9IHggPCA3OSAmJiB5ID4gMCAmJiBncmlkW3ggKyAxXVt5IC0gMV0gPyAxIDogMDtcclxuICAgIC8vIG1pZGRsZSBsZWZ0XHJcbiAgICBuZWlnaGJvckNvdW50ICs9IHggPiAwICYmIGdyaWRbeCAtIDFdW3ldID8gMSA6IDA7XHJcbiAgICAvLyBtaWRkbGUgcmlnaHRcclxuICAgIG5laWdoYm9yQ291bnQgKz0geCA8IDc5ICYmIGdyaWRbeCArIDFdW3ldID8gMSA6IDA7XHJcbiAgICAvLyBib3R0b20gbGVmdFxyXG4gICAgbmVpZ2hib3JDb3VudCArPSB4ID4gMCAmJiB5IDwgNzkgJiYgZ3JpZFt4IC0gMV1beSArIDFdID8gMSA6IDA7XHJcbiAgICAvLyBib3R0b20gbWlkZGxlXHJcbiAgICBuZWlnaGJvckNvdW50ICs9IHkgPCA3OSAmJiBncmlkW3hdW3kgKyAxXSA/IDEgOiAwO1xyXG4gICAgLy8gYm90dG9tIHJpZ2h0XHJcbiAgICBuZWlnaGJvckNvdW50ICs9IHggPCA3OSAmJiB5IDwgNzkgJiYgZ3JpZFt4ICsgMV1beSArIDFdID8gMSA6IDA7XHJcblxyXG4gICAgcmV0dXJuIG5laWdoYm9yQ291bnQ7XHJcbn1cclxuXHJcbmNsZWFyR3JpZCgpO1xyXG51cGRhdGUoKTtcclxuXHJcbmNhbnZhcy5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgZHJhd2luZyA9IHRydWU7XHJcbiAgICB2YXIgeCA9IHBhcnNlSW50KGUub2Zmc2V0WCAvIDEwKTtcclxuICAgIHZhciB5ID0gcGFyc2VJbnQoZS5vZmZzZXRZIC8gMTApO1xyXG4gICAgZHJhd01vZGUgPSAhZ3JpZFt4XVt5XTtcclxufVxyXG5cclxuY2FudmFzLm9ubW91c2V1cCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBkcmF3aW5nID0gZmFsc2U7XHJcbn1cclxuXHJcbmNhbnZhcy5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoIWRyYXdpbmcpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB4ID0gcGFyc2VJbnQoZS5vZmZzZXRYIC8gMTApO1xyXG4gICAgdmFyIHkgPSBwYXJzZUludChlLm9mZnNldFkgLyAxMCk7XHJcbiAgICBncmlkW3hdW3ldID0gZHJhd01vZGU7XHJcbn1cclxuXHJcbnN0YXJ0Lm9uY2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYoZG9VcGRhdGUpe1xyXG4gICAgICAgIGRvVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgc3RhcnQuaW5uZXJUZXh0ID0gJ1N0YXJ0JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9VcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXJ0LmlubmVyVGV4dCA9ICdQYXVzZSc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsZWFyLm9uY2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgY2xlYXJHcmlkKCk7XHJcbn1cclxuIl19
