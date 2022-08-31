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
var button, buttonMute;
var piscandoAnimation, comendoAnimation, tristeAnimation;
var cortarSom, comerSom, tristeSom, arSom, backgroundSom;

function preload(){
  fruitImg = loadImage("assets/melon.png");
  rabbitImg = loadImage("assets/Rabbit-01.png");
  backgroundImg = loadImage("assets/background.png");
  piscandoAnimation = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");
  comendoAnimation = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
  tristeAnimation = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");

  //animação começa aparecendo, ela se repete 
  piscandoAnimation.playing = true;
  piscandoAnimation.looping = true;
  //comendo, triste
  comendoAnimation.playing = true;
  comendoAnimation.looping = false;

  tristeAnimation.playing = true;
  tristeAnimation.looping = false;

  cortarSom = loadSound("assets/rope_cut.mp3");
  comerSom = loadSound("assets/eating_sound.mp3");
  tristeSom = loadSound("assets/sad.wav");
  arSom = loadSound("assets/air.wav");
  backgroundSom = loadSound("assets/sound1.mp3");
}

function setup() 
{
  //criação da tela
  createCanvas(500,700);
  //som de fundo
  backgroundSom.play();
  backgroundSom.setVolume(0.5);
  //taxa de frames
  frameRate(80);
  //mecanismo de física
  engine = Engine.create();
  //nosso mundo
  world = engine.world;

  //criação de solo
  ground = new Ground(200,690,600,20);

  //criar a corda
  rope = new Rope(6,{x:250,y:50});

  //configuração de texto e desenho
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  //criar a fruta
  fruit = Bodies.circle(300,200,15);
   
  //adicionando a fruta e a corda no composto
  Composite.add(rope.body,fruit);

  //link entre a corda e a fruta
  link = new Link(rope, fruit);

  //botão para cortar a corda
  button = createImg('assets/cut_btn.png');
  button.position(220,30);
  button.size(60,60);
  button.mouseClicked(drop);

  //botão para mutar o som de fundo
  buttonMute = createImg('assets/mute.png');
  buttonMute.position(440,30);
  buttonMute.size(60,60);
  buttonMute.mouseClicked(mute);

  //atraso para a animação
  piscandoAnimation.frameDelay = 15;

  //criar o coelho
  rabbit = createSprite(400, 630);
  //rabbit.addImage("coelho", rabbitImg);
  rabbit.addAnimation("piscando", piscandoAnimation);
  rabbit.addAnimation("comendo", comendoAnimation);
  rabbit.addAnimation("triste", tristeAnimation);

  rabbit.scale = 0.2

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

  //mostrar a fruta
  //push();
  //imageMode(CENTER);
  if(fruit != null){
    image(fruitImg,fruit.position.x, fruit.position.y, 60,60);
  }
  //pop();

   //mostrar a corda
  rope.show();

  //chamada da função de colisão
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("comendo");
    comerSom.play();
  }
  if(collide(fruit,ground.body)==true){
    rabbit.changeAnimation("triste");
    tristeSom.play();
  }

  drawSprites();
}

//função que solta a fruta da corda
function drop(){
  //colocar os comandos
  rope.break();
  link.dettach();
  link = null;
}

//função que detecta a colisão entre a fruta e o coelho
function collide(body,sprite){
  if(body != null){
    var distancia = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(distancia <= 80){
      World.remove(world,fruit);
      fruit = null;
      return true
    }else{ //não colidiu
      return false;
    }
  }
}

//função para mutar o som de fundo
function mute(){
  if(backgroundSom.isPlaying()){
    backgroundSom.stop();
  }else{
    backgroundSom.play();
  }
}