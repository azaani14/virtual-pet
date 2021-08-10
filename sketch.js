var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var sleep
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
dogSleeping=loadImage("Bed Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog=createSprite(500,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  sleep=createButton("sleep dog")
  sleep.position(500,95);
  sleep.mousePressed(sleepDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var foodStock=foodObj.getFoodStock()
if(foodStock<0){foodObj.updateFoodStock(foodStock*0)}
else{foodObj.updateFoodStock(foodStock-1)}
database.ref('/').update({
  Food:foodObj.getFoodStock()
})
  //write code here to update food stock and last fed time

}
function sleepDog(){
  background(dogSleeping,500,500)
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
