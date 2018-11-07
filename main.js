
var b;
var addPoint = false;
var addDest = false;

function setup() {
    createCanvas(1280, 640);
    b = new Board(1280, 640, 20);

}

function draw() {

    b.show()
}

function mousePressed() {
    if (addPoint) {
        b.addPoint();
    }
    if (addDest) {
        b.addDest();
    }

}

function keyPressed() {
    console.log(keyCode)
    if (keyCode === 65) {
        addPoint = !addPoint
    } else if (keyCode === 68) {
        addDest = !addDest;
    }
}