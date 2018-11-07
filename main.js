
var b;
var addPoint = false;
var addDest = false;
var addCar = false;
var erase = false;
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
    if(addCar){
        console.log("CarPoint ON")
        b.addCarPoint();
        for(var i =0; i < 30; i++){
            cars.push(new Car(b.startPoint.x, b.startPoint.y))
        }
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
        
    }
}