var towerImage,tower
var doorImage,door,doorsGroup
var climberImage,climber,climbersGroup
var invisibleBlock,invisibleBlocksGroup
var ghostImage,ghost
var gameState="play"

function preload(){
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300)
  tower.addImage(towerImage)
  tower.velocityY=1
  
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlocksGroup=new Group()
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImage)
  ghost.scale=0.4
  
}


function draw(){
  background(0)
  if (gameState==="play"){
    
  if (tower.y>400){
    tower.y=300
  }
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.8
  
    if (keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
  
    if (keyDown("right_arrow")){
    ghost.x=ghost.x+3  }
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  
  if (ghost.isTouching(invisibleBlocksGroup)||ghost.y>600){
    gameState="end"
    ghost.destroy()
  }
  
  
  spawnDoors()
  drawSprites()
  }
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)

  }
}

function spawnDoors(){
  if (frameCount%240===0){
    door=createSprite(200,-50)
    door.addImage(doorImage)
    door.x=Math.round(random(120,400))
    door.velocityY=1
    door.lifetime=800
    ghost.depth=door.depth
    ghost.depth+=1
    doorsGroup.add(door)
    
    climber=createSprite(200,10)
    climber.addImage(climberImage)
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime=800
    climbersGroup.add(climber)
    
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    invisibleBlock.lifetime=800
    invisibleBlocksGroup.add(invisibleBlock)
    
  }
}