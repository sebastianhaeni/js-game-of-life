module.exports = class GameOfLife {

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, .2)';
        this.grid = [];
        this.lastUpdate = +new Date();
        this.running = false;
        this.speed = 100;

        this.reset();
        this.draw();
    }

    isAlive(x, y){
        return this.grid[x][y];
    }

    set(x, y, alive){
        this.grid[x][y] = alive;
    }

    setSpeed(value){
        this.speed = value;
    }

    start(){
        this.running = true;
    }

    pause(){
        this.running = false;
    }

    reset(){
        for(let x = 0; x < 80; x++){
            if(this.grid[x] === undefined){
                this.grid[x] = [];
            }
            for(var y = 0; y < 80; y++){
                this.grid[x][y] = false;
            }
        }
    }

    drawLines(){
        for(let i = 0; i < 80; i++){
            this.ctx.beginPath();
            this.ctx.moveTo(10 * i, 0)
            this.ctx.lineTo(10 * i, this.canvas.width);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, 10 * i)
            this.ctx.lineTo(this.canvas.height, 10 * i);
            this.ctx.stroke();
        }
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawLines();

        let changeset = [];
        let doUpdate = false;

        if(this.running && this.lastUpdate < +new Date() - this.speed){
            this.lastUpdate = +new Date();
            doUpdate = true;
        }

        for(let x = 0; x < this.grid.length; x++){
            for(let y = 0; y < this.grid[x].length; y++){

                if(doUpdate){
                    this.update(x, y, changeset);
                }

                if(this.grid[x][y]){
                    this.ctx.fillRect(x * 10, y * 10, 10, 10);
                }
            }
        }

        for(let i = 0; i < changeset.length; i++){
            this.grid[changeset[i].x][changeset[i].y] = changeset[i].alive;
        }

        setTimeout(this.draw.bind(this), 16);
    }

    update(x, y, changeset){
        let neighborCount = this.getNeighborCount(x, y);
        let change = {
            x: x,
            y: y,
            alive: undefined
        };
        if(this.grid[x][y]){
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

    getX(x){
        if(x >= 80){
            return 0;
        } else if(x < 0){
            return 79;
        }
        return x;
    }

    getY(y){
        if(y >= 80){
            return 0;
        } else if(y < 0){
            return 79;
        }
        return y
    }

    getNeighborCount(x, y){
        let neighborCount = 0;
        let grid = this.grid;

        // top left
        neighborCount += grid[this.getX(x - 1)][this.getY(y - 1)] ? 1 : 0;
        // top middle
        neighborCount += grid[this.getX(x)][this.getY(y - 1)] ? 1 : 0;
        // top right
        neighborCount += grid[this.getX(x + 1)][this.getY(y - 1)] ? 1 : 0;
        // middle left
        neighborCount += grid[this.getX(x - 1)][this.getY(y)] ? 1 : 0;
        // middle right
        neighborCount += grid[this.getX(x + 1)][this.getY(y)] ? 1 : 0;
        // bottom left
        neighborCount += grid[this.getX(x - 1)][this.getY(y + 1)] ? 1 : 0;
        // bottom middle
        neighborCount += grid[this.getX(x)][this.getY(y + 1)] ? 1 : 0;
        // bottom right
        neighborCount += grid[this.getX(x + 1)][this.getY(y + 1)] ? 1 : 0;

        return neighborCount;
    }
};
