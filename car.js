function Car(X,Y) {
    this.x = X;
    this.y = Y;
    this.movements = new Array();

    this.incrementalMove = function(X,Y) {
      this.x += X;
      this.y += Y;
    };
    this.directionalMove = function(w) { //Faz 1 movimento do vetor de movimento 
                                            //de todos os carros 
        
        if(this.movements[w] == 0){
            this.x += 1;
        }
        else if(this.movements[w] == 2){
            this.y += 1;
        }
        else if(this.movements[w] == 1){
            this.x -= 1;
        }
        else if(this.movements[w] == 3){
            this.y -= 1;
        }
        else return false;
 
    };
    this.bbb = function(){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
    };
    this.DesMove = function(w) { //Faz 1 movimento do vetor de movimento 
                                        //de todos os carros 
        if(this.movements[w] == 0){
        this.x -= 1;
        }
        else if(this.movements[w] == 2){
        this.y -= 1;
        }
        else if(this.movements[w] == 1){
        this.x += 1;
        }
        else if(this.movements[w] == 3){
        this.y += 1;
        }
        else console.log("Wrong directionalMove parameter");

    };
  };