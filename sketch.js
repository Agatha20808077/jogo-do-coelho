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
var fruit,rope, rope2, rope3,rabbit;
var link, link2, link3;
var fruitImg, rabbitImg, backgroundImg;
var button, button2, button3, buttonMute;
var piscandoAnimation, comendoAnimation, tristeAnimation;
var cortarSom, comerSom, tristeSom, arSom, backgroundSom;
var canW, canH; //tamanho da tela (W: width, H: Height)
var soprador

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
  //createCanvas(500,700);

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW, canH);
  } else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);
  }
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
  ground = new Ground(200,canH-70,600,20);

  //criar a corda
  rope = new Rope(4,{x:250,y:50});
  rope2 = new Rope(4,{x:70,y:100});
  rope3 = new Rope(7,{x:330, y:80});

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
  link2 = new Link(rope2, fruit);
  link3 = new Link(rope3, fruit);

  //botão para cortar a corda
  button = createImg('assets/cut_btn.png');
  button.position(220,30);
  button.size(60,60);
  button.mouseClicked(drop);

  button2 = createImg('assets/cut_btn.png');
  button2.position(50,80);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  button3 = createImg('assets/cut_btn.png');
  button3.position(290,80);
  button3.size(60,60);
  button3.mouseClicked(drop3);

  //botão para mutar o som de fundo
  buttonMute = createImg('assets/mute.png');
  buttonMute.position(440,30);
  buttonMute.size(60,60);
  buttonMute.mouseClicked(mute);

  //botão para assoprar a fruta
  soprador = createImg("assets/balloon.png");
  soprador.position(50,200);
  soprador.size(60,60);
  soprador.mouseClicked(soprar);

  //atraso para a animação
  piscandoAnimation.frameDelay = 15;

  //criar o coelho
  rabbit = createSprite(200, canH-120);
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
  image(backgroundImg, width/2, height/2, canW,canH);
  
  //atualização do mecanismo de física
  Engine.update(engine);

  //mostrar o solo
  //ground.show();

  //mostrar a fruta
  //push();
  //imageMode(CENTER);
  if(fruit != null){
    image(fruitImg,fruit.position.x, fruit.position.y, 60,60);
  }
  //pop();

   //mostrar a corda
  rope.show();
  rope2.show();
  rope3.show();

  //chamada da função de colisão
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("comendo");
    comerSom.play();
  }
  if(fruit != null && fruit.position.y >= canH - 100){
    rabbit.changeAnimation("triste");
    backgroundSom.stop();
    tristeSom.play();
    fruit = null;
  }

  drawSprites();
}

//função que solta a fruta da corda
function drop(){
  //colocar os comandos
  rope.break();
  link.dettach();
  link = null;
  cortarSom.play();
}

function drop2(){
  //colocar os comandos
  rope2.break();
  link2.dettach();
  link2 = null;
  cortarSom.play();
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

function soprar(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.02, y:0});
  arSom.play()
}

function drop3(){
  //colocar os comandos
  rope3.break();
  link3.dettach();
  link3 = null;
  cortarSom.play();
}
