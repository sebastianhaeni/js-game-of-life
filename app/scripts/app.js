
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
