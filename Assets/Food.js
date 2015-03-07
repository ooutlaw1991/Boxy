#pragma strict

var food: Transform;

function Update () {
  if(food.position.x > 10 || food.position.x < -10 || food.position.y > 4 || food.position.y < -4) {
    GameManager.score--;
    Destroy(food.gameObject);  
  }
}