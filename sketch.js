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
var fruit,rope,rabbit;
var link;
var fruitImg, rabbitImg, backgroundImg;
var button;

function preload(){
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
  backgroundImg = loadImage("assets/background.png");
}

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
  rope = new Rope(6,{x:250,y:20});

  //criar o coelho
  rabbit = createSprite(200, 630);
  rabbit.addImage("coelho", rabbitImg)
  rabbit.scale = 0.2

  //criar a fruta

  var fruit_options = {
    density: 0.0001
  }

  fruit = Bodies.circle(300,250,60,fruit_options);
   
  //configuração de texto e desenho
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  //adicionando a fruta e a corda no composto
  Matter.Composite.add(rope.body,fruit);

  //link entre a corda e a fruta
  link = new Link(rope, fruit);

  //botão para cortar a corda
  button = createImg('assets/cut_btn.png');
  button.position(220,30);
  button.size(60,60);
  button.mouseClicked(drop);

}

function draw() 
{
  //cor de fundo
  //background(0);
  image(backgroundImg, width/2, height/2, width,height);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //mostrar o solo
  ground.show();

  //mostrar a corda
  rope.show();

  //mostrar a fruta
  push();
  imageMode(CENTER);
  image(fruitImg,fruit.position.x, fruit.position.y, 60,60);
  pop();

  drawSprites();
}

//função que solta a fruta da corda
function drop(){
  //colocar os comandos
  rope.break();
  link.dettach();
  link = null

}