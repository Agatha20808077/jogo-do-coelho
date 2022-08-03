//módulos da biblioteca Matter
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var link;

function setup() 
{
  //criação da tela
  createCanvas(500,700);
  //taxa de frames
  frameRate(80);
  //mecanismo de física
  engine = Engine.create();
  //nosso mundo
  world = engine.world;

  //criação de solo
  ground = new Ground(200,690,600,20);

  //criar a corda
  rope = new Rope(5,{x:250,y:20});

  //criar a fruta

  var fruit_options = {
    density: 0.001
  }

  fruit = Bodies.circle(300,300,15,fruit_options);
   
  //configuração de texto e desenho
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  //link entre a corda e a fruta
 link = new Link(rope, fruit);
}

function draw() 
{
  //cor de fundo
  background(0);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //mostrar o solo
  ground.show();

  //mostrar a corda
  rope.show();

  //mostrar a fruta
  ellipse(fruit.position.x, fruit.position.y, 20);


 

 
   
}
