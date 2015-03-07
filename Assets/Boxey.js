#pragma strict

var moveUp: KeyCode;
var moveDown: KeyCode;
var moveLeft: KeyCode;
var moveRight: KeyCode;
var keepEnabled = false;
var boxeyAnim: Animator;
var ate = false;
var blue_pref: Transform;
var orange_pref: Transform;


var speed: float = 100f;
var eatTime: float;
var eatDelay: float = .5f;

function Start () {
  boxeyAnim = GetComponent(Animator);
  
  var rand : float = Random.Range(1.0, 2.0);
  //width: -10, 10; height:-4,4
  
  //Spawn both at start
  if(rand <= 1.3) {
    FoodSpawn(blue_pref,Random.Range(1.0,2.0), Random.Range(-10, 10), Random.Range(-4, 4), Random.Range(-10,10), Random.Range(-10,10));
    FoodSpawn(orange_pref, Random.Range(1.0,2.0), Random.Range(-10, 10), Random.Range(-10, 10), Random.Range(-10,10), Random.Range(-10,10));
  }
  //Spawn one at start
  else if(rand > 1.3 && rand <= 1.6) {
    var whichFood : float = Random.Range(1.0, 2.0);
    var randWidth: float = Random.Range(-10, 10);
    var randHeight: float = Random.Range(-4, 4);
    var where: float = Random.Range(1.0,2.0);
    var randForce1: float = Random.Range(-10,10);
    var randForce2: float = Random.Range(-10,10);
    
    //Spawn blue food
    if(whichFood <= 1.5) {
      FoodSpawn(blue_pref, where, randWidth, randHeight, randForce1, randForce2);
    }
    else{
      FoodSpawn(orange_pref, where, randWidth, randHeight, randForce1,randForce2);
    }
  }
}

function OnCollisionEnter2D(coll: Collision2D) {
  if(coll.gameObject.name == "BlueFood(Clone)" || coll.gameObject.name == "OrangeFood(Clone)") {
   if(ate == false) {
      boxeyAnim.SetTrigger("Eating");
      eatTime = eatDelay;
      ate = true;
    }
    
    transform.localScale -= Vector3(.05,.05,.05);
    
    if(transform.localScale == Vector3(0,0,0)) {
      Application.LoadLevel(2);
    }
    
    audio.Play();
    
    var foodName = coll.gameObject.name;
    GameManager.Score(foodName);
    Destroy(coll.gameObject);
  }
}

function FoodSpawn(foodType: Transform, where:float, randWidth: float, randHeight:float, randForce1: float, randForce2: float) {
  var clone: Transform;
  if(where <=1.25) {
    clone = Instantiate(foodType, Vector2(-10, randHeight),Quaternion.identity);
    if(randForce1 < 1) {
      clone.rigidbody2D.AddForce(new Vector2(-randForce1, randForce2));
    }
    else {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, randForce2));
    }
  }
  else if(where > 1.25 && where <= 1.5) {
    clone = Instantiate(foodType, Vector2(10, randHeight), Quaternion.identity);
    if(randForce1 > 1) {
      clone.rigidbody2D.AddForce(new Vector2(-randForce1, randForce2));
    }
    else {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, randForce2));
    }
  }
  else if(where > 1.50 && where <= 1.75) {
    clone = Instantiate(foodType, Vector2(randWidth, -4), Quaternion.identity);
     if(randForce2 < 1) {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, -randForce2));
    }
    else {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, randForce2));
    }
  }
  else if(where > 1.75 && where <= 2) {
    clone = Instantiate(foodType, Vector2(randWidth, 4), Quaternion.identity);
    if(randForce2 > 1) {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, -randForce2));
    }
    else {
      clone.rigidbody2D.AddForce(new Vector2(randForce1, randForce2));
    }
  }
}

while(true) {
  var randTime : float = Random.Range(1.0, 5.0); 
  yield WaitForSeconds(randTime);
  
  var rand : float = Random.Range(1.0, 2.0);
  
  //Spawn both right now
  if(rand <= 1.5) {
    FoodSpawn(blue_pref, Random.Range(1.0,2.0), Random.Range(-10, 10), Random.Range(-4, 4), Random.Range(-10,10), Random.Range(-10,10));
    FoodSpawn(orange_pref, Random.Range(1.0,2.0), Random.Range(-10, 10), Random.Range(-4, 4), Random.Range(-10,10), Random.Range(-10,10));
  }
  //Spawn one right now
  else if(rand > 1.5) {
    var whichFood : float = Random.Range(1.0, 2.0);
    var randWidth: float = Random.Range(-10, 10);
    var randHeight: float = Random.Range(-4, 4);
    var where: float = Random.Range(1.0,2.0);
    var randForce1: float = Random.Range(-10,10);
    var randForce2: float = Random.Range(-10,10);
    
    //Spawn blue food
    if(whichFood <= 1.5) {
      FoodSpawn(blue_pref, where, randWidth, randHeight, randForce1, randForce2);
    }
    else{
      FoodSpawn(orange_pref, where, randWidth, randHeight, randForce1, randForce2);
    }
  }
}

function Update () {
  if (Input.GetKey(moveUp)){
    rigidbody2D.velocity.y = speed;
  }
  else if (Input.GetKey(moveDown)){
    rigidbody2D.velocity.y = -speed;
  }
  else if (Input.GetKey(moveRight)){
    rigidbody2D.velocity.x = speed;
  }
  else if (Input.GetKey(moveLeft)){;
    rigidbody2D.velocity.x = -speed;
  }
  else {
    rigidbody2D.velocity.y = 0;
    rigidbody2D.velocity.x = 0;
  }
  
  eatTime -= Time.deltaTime;
  
  if(eatTime <= 0 && ate == true) {
    boxeyAnim.SetTrigger("Roaming");
    ate = false;
  }
}