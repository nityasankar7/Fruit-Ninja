var swordImage,sword;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
var fruitGroup,fruitImage;
var fruit1,fruit2,fruit3,fruit4;
var enemyGroup;
var enemy;
var gameOverImage;
var knife,gameSound;

function preload(){
  swordImage=loadImage("sword.png")
  gameOverImage=loadImage("gameover.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  knife=loadSound("knifeSwoosh.mp3")
  gameSound=loadSound("gameover.mp3")
  enemy=loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png")
}

function setup(){
  createCanvas(400,400)  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  fruitGroup=new Group();
  enemyGroup=new Group();
  score=0;
}

function draw(){
  background("purple");
 
  //display Score
  fill("white");
  text("Score:"+score,30,30);
  if (gameState===PLAY){
     fruits();
     enemies(); 
    //move Sword
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    //destroy fruit
    if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     score=score+2
     //create fruit and enemy
    //knife.play()
    }
    if(enemyGroup.isTouching(sword)) {
     sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    sword.scale=2;
    gameSound.play();
    gameState=END;
   }
  }
  else if(gameState===END){
  sword.addImage(gameOverImage);
  sword.x=200;
  sword.y=200;
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  fruitGroup.velocityX=0;
  enemyGroup.velocityX=0;
  } 

  

 
  drawSprites();
  
  
}
function fruits(){
if(frameCount%80===0){
    position=Math.round(random(1,2));
    fruit=createSprite (400,200,20,20);
    fruit.scale=0.2;
    if(position==1)
    {
    fruit.x=400
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
     if(position==2)
    {
    fruit.x=0
    fruit.velocityX=(7+(score/4));
    }
      }
    
    
    r=Math.round(random(1,4))
    if(r==1){
      fruit.addImage(fruit1);
    }
    if(r==2){
      fruit.addImage(fruit2);
    }
    if(r==3){
      fruit.addImage(fruit3);
    }
    if(r==4){
      fruit.addImage(fruit4);
    }
  fruit.y=Math.round(random(50,340));
  
  //fruit.velocityX=-7;
  fruit.setLifetime=100;
  
  fruitGroup.add(fruit);
  }
}

function enemies(){
 if(frameCount%200===0) {
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",enemy);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
   
    enemyGroup.add(monster);
  
    }
  }
