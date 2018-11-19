
var b;
//var b_prev;
var Copy_bool = true;
var c;
var Epoch = 0;
var Num_car = 100;
var Num_mov = 60;
var j_global = true;
var i_global = 0;
var z_global = 0;
var addPoint = false;
var addDest = false;
var addCar = false;
var Black = false;
var erase = false;
var start = false;
var CarPoint = p5.Vector.random2D()
var cars = [];
var fitness = [];
var Error = [];
var Batidas =0;


function setup() {
    createCanvas(1280, 640);
    b = new Board(1280, 640, 20);
    //b_prev = new Board(1280, 640, 20)


}

function draw() {

    b.show()
}
function mouseDragged() {
    if (erase) {

        b.Erase();
    } else if (Black) b.Black();
}
function mousePressed() {
    if (addPoint) {
        b.RandomSquare();
    }
    if (addDest) {
        b.addDest();
        addDest = !addDest;
    }
    if (addCar) {
        b.addCarPoint();
        for (var i = 0; i < Num_car; i++) {
            cars.push(new Car(b.startPoint.x, b.startPoint.y, Num_mov));


        };
        addCar = !addCar;
    }




}

function keyPressed() {
    console.log(keyCode)
    if (keyCode === 65) {
        console.log("Point ON")
        addPoint = !addPoint
    } else if (keyCode === 68) {//D
        console.log("Dest ON")
        addDest = !addDest;
    } else if (keyCode === 67) { //C
        console.log("CarPoint ON")
        addCar = !addCar
    } else if (keyCode === 70) { //F
        console.log("Black ON")
        Black = !Black
    } else if (keyCode === 69) {//E
        console.log("Erase ON")
        erase = !erase
    } else if (keyCode == 83) { // S
        if (Copy_bool) {
            //b_prev.Copy(b.board)
            b.store();
            //b_prev.board = b.board.slice(0)
            Copy_bool = false;
        }

        if (cars.length > 0) {
            console.log("Let's start, shall we?");
            setInterval(function () {
                Car_draw(i_global);
                if (i_global >= Num_mov) {
                    console.log("Acabou a Epoch", Epoch);
                    Epoch++;
                    i_global=0
                   
                    for(var i=0; i<Num_car; i++) { //Faz a fitness de todos os carros
                        cars[i].Fitness(b.destination.x, b.destination.y)     
                    }
                   
                    
                    
                    cars.sort(function(a, b) {
                        return a.Error - b.Error;
                    }); 
                    b.board[cars[0].x][cars[0].y] = 5
                    b.show()
                    window.alert("Batidas")
                    window.alert(cars[0].Batidas)
                    window.alert("Error")
                    window.alert(cars[0].Error)
                    window.alert(cars[1].Error)
                    window.alert(cars[cars.length -1].Error)
                    selection(cars);


                    for (var i = 0; i < Num_car; i++) { // Leva todos os carros pro ponto inicial
                        cars[i].x = b.startPoint.x;
                        cars[i].y = b.startPoint.y;
                        cars[i].Error = 0;
                        cars[i].Batidas =0;
                    }
                   
                    b.Copy(b_prev.board);

                    //b.Copy(b_prev.board);
                    b.refresh();
                    //b.board = b_prev.board.slice(0);

                } else i_global++


            }, 30);

        }


    }
    else if (keyCode == 87) {
        //Acho q n precisa disso aqui

    }//else console.log("Acho que faltou o StartPoint");
}

function Car_draw() {

    //b.Copy(b_prev.board);
    b.refresh();
    //b.board = b_prev.board.slice(0)
    for (var i = 0; i < Num_car; i++) {

        //b.board[cars[i].x][cars[i].y] = b_prev.board[cars[i].x][cars[i].y];
        cars[i].directionalMove(i_global)
        
        
        
        
        if (b.board[cars[i].x][cars[i].y] == 1) {
            cars[i].Error += 2;
            cars[i].Batidas ++;
            cars[i].DesMove(i_global);
            b.board[cars[i].x][cars[i].y] = 4;
        } else b.board[cars[i].x][cars[i].y] = 4;


    }

}
function selection(cars) {
    bestCars_Array = new Array()
    newCars = new Array(cars.length)

    //Cópia do vetor de carros pra alterar os movimentos
    for (var i = 0; i < cars.length; i++) {
        newCars[i] = new Car(cars[i].x, cars[i].y);
        newCars[i].CopyMov(cars[i])
    }


    //Mutação - começa em 5% e termina em 10% do vetor de newCars
    Mutation(cars, newCars);

    //Reprodução - Começa em 10% e vai até o fim do vetor
    for (var x = round(cars.length * 0.1); x < cars.length; x++) {

        //Enche um vetor com  n carros aleatorios
        var rand = floor(random(2,cars.length))
        var rand3 = floor(random(0,floor(cars.length*0.3)))
        checkifRepeat_Array = new Array() 
        //TEM QUE SER UM WHILE. N pode ter carros repetidos em temp
        while (bestCars_Array.length < rand) {
            var rand2 = floor(random(0, cars.length))
            if (!Repeated(rand2, checkifRepeat_Array)) {
                bestCars_Array.push(cars[rand2])
            }

        }


        //Ordena e pega os 2 melhores
        bestCars_Array.sort(function (a, b) {
            return a.Error - b.Error;

        newCars[x].CopyMov(Reproduction(bestCars_Array[0],newCars[rand3])); 
        bestCars_Array = new Array();
        }  
    }


    for(var x = 0; x < cars.length; x++) {
        cars[x].CopyMov(newCars[x])
    }




}

function Reproduction(Car1, Car2) {
    var newbornCar = new Car()
    var rand = floor(random(0,Car1.movements.length))
    for(var i = 0; i < newbornCar.movements.length; i++){
        
        if(round(random(0,1)) == 0 ){
            newbornCar.movements[i] = Car1.movements[i];
        } else newbornCar.movements[i] = Car2.movements[i];
    }
    
    return newbornCar
}
function Mutation(cars, newCars) {
    for (var i = round(cars.length * 0.05); i < round(cars.length * 0.1); i++) {
        var rand1 = floor(random(0, cars.length - 0.1));
        var rand2 = round(random(0, cars[2].movements.length));
        cars[rand1].movements[rand2] = floor(random(0, 3.5))
        if (cars[rand1].movements[rand2] > 3) window.alert(cars[rand1].movements[rand2])
        newCars[i] = cars[rand1];

    }
}

function Repeated(rand2, Temp3) {
    for (var x = 0; x < Temp3.length; x++) {
        if (Temp3[x] == rand2) return true

    }
    return false;
}
