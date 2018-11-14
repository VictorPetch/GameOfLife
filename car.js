function Car(X, Y) {
    this.x = X;
    this.y = Y;
    this.movements = new Array(60);
    for (var x = 0; x < this.movements.length; x++) {
        this.movements[x] = floor(random(4));
    }

    this.incrementalMove = function (X, Y) {
        this.x += X;
        this.y += Y;
    };
    this.directionalMove = function (w) { //Faz 1 movimento do vetor de movimento 
        //de todos os carros 

        if (this.movements[w] == 0) {
            this.x += 1;
        }
        else if (this.movements[w] == 2) {
            this.y += 1;
        }
        else if (this.movements[w] == 1) {
            this.x -= 1;
        }
        else if (this.movements[w] == 3) {
            this.y -= 1;
        }
        else return false;

    };
    this.bbb = function () {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
    };
    this.DesMove = function (w) { //Faz 1 movimento do vetor de movimento 
        //de todos os carros 
        if (this.movements[w] == 0) {
            this.x -= 1;
        }
        else if (this.movements[w] == 2) {
            this.y -= 1;
        }
        else if (this.movements[w] == 1) {
            this.x += 1;
        }
        else if (this.movements[w] == 3) {
            this.y += 1;
        }
        else console.log("Wrong directionalMove parameter");

    };
    this.Fitness = function(Dest_x, Dest_y){
        this.Error = abs(Dest_x - this.x)+ abs(Dest_y - this.y )

    }
};
