
var b;
var c;
var seila;
var addPoint = false;
var addDest = false;
var addCar = false;
var erase = false;
var start = false;
var CarPoint = p5.Vector.random2D()
var cars = [];

function setup() {
    createCanvas(1280, 640);
    b = new Board(1280, 640, 20);

    
}

function draw() {

    b.show()
}

function mousePressed() {
    if (addPoint) {
        console.log("Point ON")
        b.addPoint();
    }
    if (addDest) {
        console.log("Dest ON")
        b.addDest();
        addDest = !addDest;
    }
    if(addCar){                         // Cada vez que C estiver apertado e o mouse for clicado,
        console.log("CarPoint ON")      // vao ser criados n carros com um vetor de movimentos cada.
        b.addCarPoint();
        for(var i =0; i < 2; i++){
            cars.push(new Car(b.startPoint.x, b.startPoint.y));
            cars[i].movements = [floor(random(4)),floor(random(4)),floor(random(4)),floor(random(4)),
                                floor(random(4)),floor(random(4)),floor(random(4)),floor(random(4)),
                                floor(random(4)),floor(random(4)),floor(random(4)),floor(random(4)),
                                floor(random(4)),floor(random(4)),floor(random(4)),floor(random(4)),
                                floor(random(4)),floor(random(4)),floor(random(4)),floor(random(4))];
            
        };
        addCar = !addCar;
    }
    if(erase){
        console.log("Erase ON")
        b.Erase();
    }
    
    

}

function keyPressed() {
    console.log(keyCode)
    if (keyCode === 65) {
        addPoint = !addPoint
    } else if (keyCode === 68) { 
        addDest = !addDest;
    } else if (keyCode === 67){
        addCar = !addCar
    }else if (keyCode === 69){
        erase = !erase
    }else if(keyCode == 83){

        console.log("Let's start, shall we?");
        if(cars.length > 0){
            for(var j =0; j < 2; j++){
                console.log("J:", j)
                
                for(var i = 0; i < 16; i++){ //Movimenta todos os carros 1 mov.
                    
                    cars[0].directionalMove(w = j);
                    
                    
                }
                for(var v =0;v < cars.length; v++){ //Pinta todos os carros depois de 1 mov.
                    b.board[cars[v].x][cars[v].y] = 4;
                }
            
                setTimeout(b.show, 20000)
                

                

                
            }
            console.log(cars[0].movements)
            console.log(cars[1].movements)
            
        }else console.log("Deu ruim no start");
        


        
    }
}