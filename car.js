function Car(X,Y) {
    this.x = X;
    this.y = Y;
    
    this.incrementalMove = function(X,Y) {
      this.x += X;
      this.y += Y;
    };
    this.directionalMove = function(direction) {
        if(direction === 0){
            this.x += 1;
        }
        else if(direction === 1){
            this.y += 1;
        }
        else if(direction === 2){
            this.x -= 1;
        }
        else if (direction === 3){
            this.y -= 1;
        }
        else console.log("Wrong directionalMove parameter");
        
    };
  
   
  };