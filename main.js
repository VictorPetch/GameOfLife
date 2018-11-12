
var b;
var b_prev;
var Copy_bool = true;
var c;
var Epoch =0;
var Num_car = 30;
var Num_mov = 20;
var j_global =true;
var i_global =0;
var z_global=0;
var addPoint = false;
var addDest = false;
var addCar = false;
var erase = false;
var start = false;
var CarPoint = p5.Vector.random2D()
var cars = [];
var fitness = [];


function setup() {
    createCanvas(1280, 640);
    b = new Board(1280, 640, 20);
    b_prev = new Board(1280,640,20)
    
    
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
    if(addCar){                         // Cada vez que C estiver apertado e o mouse for clicado,
        console.log("CarPoint ON")      // vao ser criados n carros com um vetor de movimentos cada.
        b.addCarPoint();
        for(var i =0; i < Num_car; i++){
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
    }else if (keyCode === 68) { 
        addDest = !addDest;
    }else if (keyCode === 67){
        addCar = !addCar
    }else if (keyCode === 69){
        erase = !erase
    }else if(keyCode == 83){
        if(Copy_bool){
            b_prev.Copy(b.board)
            Copy_bool = false;
        }
        
        if(cars.length > 0){
            console.log("Let's start, shall we?");
            setInterval(function(){
                Car_draw(i_global);
                if(i_global > Num_mov){
                    console.log("Acabou a Epoch", Epoch);
                    Epoch++;
                    i_global=0
                    console.log("StartPoint", b.startPoint)
                    console.log("Antes da ordenação", cars)
                    cars.sort(function(a,c){
                        var Erro_a = abs(b.destination.x - a.x) + abs(b.destination.y - a.y)
                        var Erro_b = abs(b.destination.x - c.x) + abs(b.destination.y - c.y)
                        return Erro_a - Erro_b;
                    })
                    console.log("Depois da ordenação",cars)

                    for(var i=0; i<Num_car; i++){ // Leva todos os carros pro ponto inicial
                        cars[i].x = b.startPoint.x;
                        cars[i].y = b.startPoint.y;
                    }
                    
                    b.Copy(b_prev.board);

                    
                }else i_global++
               
               
            },200);
              
        }
            

    }
    else if(keyCode == 87){
         //Acho q n precisa disso aqui
            
    }//else console.log("Acho que faltou o StartPoint");
}

function Car_draw(){
    for(var i =0; i < Num_car; i++){
        
        b.board[cars[i].x][cars[i].y] = b_prev.board[cars[i].x][cars[i].y];
        cars[i].directionalMove(i_global)
        if(b.board[cars[i].x][cars[i].y] == 1){
           cars[i].DesMove(i_global);
           b.board[cars[i].x][cars[i].y] = 4
        }else b.board[cars[i].x][cars[i].y] = 4;
        

    }
}
function Fitness(cars,Destination){
    var Error = new Array();
    for (car in cars){
        Error.push(abs(Destination.x - car.x) + abs(Destination.y - car.y ))

    }
    return Error;

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