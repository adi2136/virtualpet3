var dog,dogImage,happyDogImage;
var database;
var Food,foodStock;
var milk,milkImg
var addFood,feed,addFoods,feedDog
var food
var fedTime,lastFeedTime
var data
var readState,gameState;
var gardernImg,washImg,bedImg
var currentTime;
function preload()
{
	dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")
  gardernImg=loadImage("virtual pet images/Garden.png")
  washImg=loadImage("virtual pet images/Wash Room.png")
  bedImg=loadImage("virtual pet images/Bed Room.png")
}

function setup() {
	createCanvas(500, 800);
dog=createSprite(250,700)
dog.addImage(dogImage)
dog.scale=0.2
database=firebase.database();
foodStock=database.ref("food")
foodStock.on("value",readStock)
addFood=createButton("ADD FOOD")
addFood.position(300,80)
addFood.mousePressed( addFoods )
feed =createButton("FEED THE DOG")
feed.position(400,80)
feed.mousePressed(feedDog)
foodStock=database.ref("food")
foodStock.on("value",readStock)
food=new Foods();

readState=database.ref("gameState")
readState.on("value",function (data){
  gameState = data.val()
})
currentTime=hour()
}



function draw() {  
  background("green")
  fedTime=database.ref("feedTime")
  fedTime.on("value",function( data ){
    lastFeedTime=data.val()
  })
  
 
 
  
  if(gameState!=="hungry"){
    addFood.hide()
    feed.hide()
   
  }else{
    addFood.show()
    feed.show()
    food.display();
    drawSprites();
  }
  if(currentTime == lastFeedTime+1){
    food.garden()
    updateState("playing")
  }else if(currentTime == lastFeedTime+2){
    food.bedroom()
    updateState("sleeping")
  }else if(currentTime >= lastFeedTime+3 && currentTime<= lastFeedTime+4){
    food.bathroom()
    updateState("bathing")
  }else{
    updateState("hungry")
  }
  fill("black")
  textSize(30)
  //text("Last Feed Time :"+ lastFeedTime,100,80)
  if(lastFeedTime===undefined){
    text("")
  }
else if(lastFeedTime>12 && lastFeedTime % 12 !==0){
  text("Last Feed Time :"+ (lastFeedTime%12) + "PM",100,80)
}else if(lastFeedTime==24){
  text("Last Feed Time : 12 AM",100,80)
}else if(lastFeedTime===12){
  text("Last Feed Time : 12 PM",100,80)
}
else{
  text("Last Feed Time :"+ lastFeedTime + "AM",100,80)
}






}

function readStock(data){
 Food=data.val();
 food.updateFood(Food)
}
function writeStrock(x){
  if(x<=0){
    x = 1
  }
  x=x-1;
database.ref('/').update({
  food:x
})
}
function addFoods(){
  if(Food <60){
  Food++
  dog.addImage(dogImage)
  database.ref('/').update({
    food:Food,
  
})
}   
  
}
function feedDog(){
  if(Food>0){
  Food--;
  dog.addImage(happyDogImage)
  database.ref('/').update({
    food:Food,
    feedTime:hour()
  })
}
}
function updateState(state){
  database.ref("/").update({
    gameState:state
  })
}















