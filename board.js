function Board(width = 720, height = 400, w = 40) {

    this.columns = floor(width / w);
    this.rows = floor(height / w);
    this.w = w
    this.points = new Array();
    this.board = new Array(this.columns);
    this.destination = p5.Vector.random2D()
    this.startPoint = p5.Vector.random2D()
    this.erasePoint = p5.Vector.random2D()

    for (var i = 0; i < this.columns; i++) {
        this.board[i] = new Array(this.rows);
    }

    // Dont know if that is necessary but im adding
    this.next = new Array(this.columns);
    for (i = 0; i < this.columns; i++) {
        this.next[i] = new Array(this.rows);
    }

    for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.rows; j++) {
            // Lining the edges with 0s
            this.board[i][j] = 0;
            this.next[i][j] = 0;
        }
    }

}

Board.prototype.show = function () {

    background(255);
    //generate();
    //console.log('entrei')
    for (var i = 0; i < this.columns; i++) {
        for (var j = 0; j < this.rows; j++) {
            //console.log(this.board[i][j])
            if ((this.board[i][j] == 1)) fill(0);
            else if ((this.board[i][j] == 0)) fill(255);
            else if ((this.board[i][j] == 2)) fill(255,0,0);
            else if (this.board[i][j] == 3) fill(0, 255, 0);
            else fill(0,0,255);

            stroke(0);
            rect(i * this.w, j * this.w, this.w - 1, this.w - 1);
        }
    }

}

Board.prototype.addPoint = function () {

    this.points.push(createVector(floor(mouseX / this.w), floor(mouseY / this.w)))
    for (var x = 0; x < this.points.length; x++) {
        //this.points[x] = createVector(floor(random(this.columns)), floor(random(this.rows)));
        for (var i = 0; i < this.rows; i++) {
            this.board[this.points[x].x][i] = 1
        }
        for (var i = 0; i < this.columns; i++) {
            this.board[i][this.points[x].y] = 1
        }
    }

}

Board.prototype.addDest = function () {
    this.destination = createVector(floor(mouseX / this.w), floor(mouseY / this.w))
    this.board[this.destination.x][this.destination.y] = 2

}

Board.prototype.addCarPoint = function() {
    this.startPoint = createVector(floor(mouseX / this.w), floor(mouseY / this.w))
    console.log(this.startPoint);
    this.board[this.startPoint.x][this.startPoint.y] = 3
}

Board.prototype.Erase = function(){
    this.erasePoint = createVector(floor(mouseX / this.w), floor(mouseY / this.w))
    this.board[this.erasePoint.x][this.erasePoint.y] = 0
}
