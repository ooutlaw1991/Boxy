#pragma strict

static var score: int = 250;
var theSkin: GUISkin;

static function Score (foodName: String) {
  if(foodName == "BlueFood(Clone)") {
    score += 1;
  }
  else{
    score += 2;
  }
}

function OnGUI() {
  GUI.skin = theSkin;
  GUI.Label(new Rect (20, 20, 150, 100), "Score: "+score);
}

while(true) {
if(score != 0) {
 yield WaitForSeconds(.5);
 score--;
 
 }else {
   Application.LoadLevel("GameOver");
   break;
 }
}