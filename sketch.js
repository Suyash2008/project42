var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaIm,bananaGroup;
var obstacle,obstacleIm,obstacleGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaIm = loadImage("banana.png");
  obstacleIm = loadImage("stone.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleGroup = new Group()
  bananaGroup = new Group()
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnObstacle()
    if(player.isTouching(obstacleGroup)){
      gameState = END

      
    }
    spawnBanana()
    if(player.isTouching(bananaGroup)){
      score = score + 2
      bananaGroup.destroyEach()
      player.scale = player.scale + 0.1
    }


  }
  if(gameState === END){
    obstacleGroup.destroyEach()
    backgr.destroy()
    background("blue")
    textSize(30)
    fill("yellow")
    text("Game Over",400,200)
  }


  drawSprites();
}
function spawnObstacle(){
  if(frameCount % 100 === 0){
 obstacle = createSprite(801,310);
 obstacle.addImage(obstacleIm); 
 obstacle.scale = 0.2   
 obstacle.velocityX = -4;
 obstacle.lifetime = 350; 
 obstacleGroup.add(obstacle);   
  }   
 }
 function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(401,Math.round(random(120,200)));
    banana.addImage(bananaIm);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }

}

