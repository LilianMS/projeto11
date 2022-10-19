const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower1,tower2;
var fundo_img;
var cannon;
var cannonBall;
var angle;
var balls=[];
//var boats=[];
var boat;


function preload(){
  fundo_img = loadImage("assets/background.gif");
}


function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  tower1 = new Tower(150,350,160,310);
  
  angle=-PI/4;
  cannon= new Cannon(180,110,100,50,angle);
  
  chao = new Tower(600,590,1200,1);
  boat = new Boat(width,height-100,200,200,-100);
}

function draw() 
{
  background(51);
  image(fundo_img,0,0,width,height);
  Engine.update(engine);

  boat.display();
  Body.setVelocity(boat.body,{x:-0.9,y:0});

  //showBoats(); --- ADICIONAL

  chao.show();
  cannon.display();
  tower1.show();
  //cannonBall.display();

  for(var i=0;i<balls.length;i++){
    exibirBall(balls[i],i);
  }
  
  

}

function keyReleased(){
  if(keyCode === RIGHT_ARROW){
    //cannonBall.shoot();
    balls[balls.length-1].shoot();
  }
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    cannonBall = new  CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
  }
}

function exibirBall(ball,index){
  ball.display();
  if(ball.body.position.x >= width || ball.body.position.y >= height -50){
    World.remove(world,ball.body);
    balls.splice(index,1);
  }
}

/* ADICIONAL
function showBoats(){
  if(boats.length > 0){
    if(boats.length < 4 &&
      boats[boats.length-1].body.position.x < width-300){
      var positions =[-100,-130,-120,-80];
      var position = random(positions);
      var boat = new Boat(width, height-100,200,200,position);
      boats.push(boat);
    }
      for(var i = 0; i< boats.length;i++){
        Body.setVelocity(boats[i].body,{
        x: -0.9,
        y: 0
        });

        boats[i].display();

    }
  }else{
    var boat = new Boat(width, height-100,200,200,-100);
    boats.push(boat);
  }
  
}
*/