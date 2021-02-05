var database, position;
var balloon, backgroundImage, balloonImage;

function preload(){
  balloonImage = loadAnimation("/Hot Air Ballon-02.png", "/Hot Air Ballon-03.png", 
  "/Hot Air Ballon-04.png");
  
  backgroundImage = loadImage("/Hot Air Ballon-01.png");

}


function setup() {
  createCanvas(1500,800);

  database = firebase.database();
  console.log(database);
  
  ballon=createSprite(250, 650, 150, 150);
  ballon.addAnimation("Hotairballoon", balloonImage);
  var ballonPosition=database.ref('balloon/position');
  ballonPosition.on("value", readHeight, showError);


}

function draw() {
  background(backgroundImage);  


  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    ballon.addAnimation("Hotairballoon", balloonImage);
  } else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    ballon.addAnimation("Hotairballoon", balloonImage);
  } else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    ballon.addAnimation("Hotairballoon", balloonImage);
    balloon.scale=balloon.scale- 0.005;
  } else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    ballon.addAnimation("Hotairballoon", balloonImage);
    balloon.scale=balloon.scale+ 0.005;
  }
 drawSprites();

   textSize(20);
   text("Use arrows to move the hot air balloon", 40, 40);
  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
  }) 
}

function readHeight(data){
  height = data.val();  
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("errow in the database");
}