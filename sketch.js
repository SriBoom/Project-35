var database, position;
var balloon, backgroundImage, balloonImage;

function preload(){
  balloonImage = loadAnimation("/Hot Air Ballon-02.png", "/Hot Air Ballon-03.png", 
  "/Hot Air Ballon-04.png");
  
  backgroundImage = loadImage("/Hot Air Ballon-01.png");
  var ballonPosition=database.ref('balloon/height');
  ballonPosition.on("value", readPosition, showError);

}


function setup() {
  createCanvas(500,500);
  database = firebase.database();
  console.log(database);

}

function draw() {
  background(backgroundImage);  


  if(keyDown(LEFT_ARROW)){
     balloon.x = balloon.x-10;
  } else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10;
  } else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10;
  } else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10;
  }

  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon", balloonImage);
    balloon.scale=balloon.scale- 0.01;
  }
  
  
  animation(balloonImage, 200, 200);
  
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
      'x':position.x+x,
      'y':position.y+y
  }) 
}

function readPosition(data){
  position = data.val();  
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("errow in the database");
}