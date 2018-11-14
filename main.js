
var b;
var b_prev;
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
var erase = false;
var start = false;
var CarPoint = p5.Vector.random2D()
var cars = [];
var fitness = [];
var Error = [];


function setup() {
    createCanvas(1280, 640);
    b = new Board(1280, 640, 20);
    b_prev = new Board(1280, 640, 20)


}

function draw() {

    b.show()
}

function mousePressed() {
    if (addPoint) {
        console.log("Point ON")
        b.RandomSquare();
    }
    if (addDest) {
        console.log("Dest ON")
        b.addDest();
        addDest = !addDest;
    }
    if (addCar) {                         // Cada vez que C estiver apertado e o mouse for clicado,
        console.log("CarPoint ON")      // vao ser criados n carros com um vetor de movimentos cada.
        b.addCarPoint();
        for (var i = 0; i < Num_car; i++) {
            cars.push(new Car(b.startPoint.x, b.startPoint.y));


        };
        addCar = !addCar;
    }
    if (erase) {
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
    } else if (keyCode === 67) {
        addCar = !addCar
    } else if (keyCode === 69) {
        erase = !erase
    } else if (keyCode == 83) { // S
        if (Copy_bool) {
            b_prev.Copy(b.board)
            Copy_bool = false;
        }

        if (cars.length > 0) {
            console.log("Let's start, shall we?");
            setInterval(function () {
                Car_draw(i_global);
                if (i_global > Num_mov) {
                    console.log("Acabou a Epoch", Epoch);
                    Epoch++;
                    i_global=0
                    for(var i=0; i<Num_car; i++){ //Faz a fitness de todos os carros
                        cars[i].Fitness(b.destination.x, b.destination.y)     
                    }
                    cars.sort(function(a, b) {
                        return a.Error - b.Error;
                    }); 
                    console.log("Antes",cars)
                    selection(cars);
                    console.log("Dps", cars)


                    for(var i=0; i<Num_car; i++){ // Leva todos os carros pro ponto inicial
                        cars[i].x = b.startPoint.x;
                        cars[i].y = b.startPoint.y;
                    }

                    b.Copy(b_prev.board);


                } else i_global++


            }, 50);

        }


    }
    else if (keyCode == 87) {
        //Acho q n precisa disso aqui

    }//else console.log("Acho que faltou o StartPoint");
}

function Car_draw() {
    for (var i = 0; i < Num_car; i++) {

        b.board[cars[i].x][cars[i].y] = b_prev.board[cars[i].x][cars[i].y];
        cars[i].directionalMove(i_global)
        if (b.board[cars[i].x][cars[i].y] == 1) {
            cars[i].DesMove(i_global);
            b.board[cars[i].x][cars[i].y] = 4
        } else b.board[cars[i].x][cars[i].y] = 4;


    }
}
//Isso daqui tem que ir embora
function Fitness(cars, Destination) {
    var Error = new Array();
    for (car in cars) {
        Error.push(abs(Destination.x - car.x) + abs(Destination.y - car.y))

    }
    return Error;

}


function selection(cars) {
    Temp = new Array()
    newCars = new Array(cars.length)

    //Cópia do vetor de carros pra alterar os movimentos
    for (var i = 0; i < cars.length; i++) {
        newCars[i] = new Car(cars[i].x, cars[i].y);
        newCars[i].CopyMov(cars[i])
    }
    //Preenchendo de 4 até 28 com reprodução(na vdd só altera os movimentos de 4 a 18)
    for (var x = 1; x < floor(cars.length * 0.98); x++) {
        

        //Enche um vetor com  n carros aleatorios
        var rand = floor(random(2,cars.length))
        Temp3 = new Array() 

        for(y = 0;y <rand; y++ ){
            var rand2 = floor(random(0,cars.length))
            if(!Repeated(rand2, Temp3)){
                Temp.push(cars[rand2])

            }

        }


        //Ordena e pega os 2 melhores
        Temp.sort(function(a, b) {
            
            return a.Error - b.Error
            
        }); 

        newCars[x].CopyMov(Reproduction(Temp[0], Temp[1])) 
        Temp = new Array()
    }
    //Fazer a mutaçao
    var rand = floor(random(0,10))
    for(var x = floor(cars.length * 0.98); x < cars.length; x++){
        if(rand < 5 ){
            var rand2 = floor(random(0,cars[2].movements.length))
            newCars[x].movements[rand2] = floor(random(0,4))
        }
    }
    for (var x = 0; x < cars.length; x++) {
        cars[x].CopyMov(newCars[x])
    }
    
    
}
function Reproduction(Car1, Car2){
    var Temp2 = new Car()
    var rand = floor(random(0,Car1.movements.length)    )
    for(i = 0; i< rand; i++){   
        Temp2.movements[i] = Car1.movements[i]
    }
    for(i = rand; i< Car2.movements.length;i++){
        Temp2.movements[i] = Car2.movements[i]
    }
    return Temp2
}
function Repeated(rand2, Temp3){
    for(var x =0; x < Temp3.length; x++){
        if(Temp3[x] == rand2) return true
        
    }
    return false;
}
//

/*for(var j =0; j < 2; j++){
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
            console.log(cars[1].movements) */