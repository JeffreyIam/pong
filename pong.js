var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

//set up canvas and grab 2d context 
var canvas = document.createElement('canvas');
var width = 300;
var height = 300;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

//attach canvas to screen when page loads and call step function using animate method

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};
//step will upadte objects, player's paddle, computer's paddle, and ball and render objects 
//will use requestAnimationFrame to call the step function again 

var step = function() {
  update();
  render();
  animate(step);
};

var keysDown = {}; 

window.addEventListener('keydown', function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
  delete keysDown[event.keyCode]; 
});


var update = function() {
  player.update(); 
  ball.update(player.paddle, wall.paddle)
};

Player.prototype.update = function() {
  for(var key in keysDown){
    var value = Number(key); 
    if(value == 40) { 
      this.paddle.move(0,2)
    }else if(value == 38){
      this.paddle.move(0,-2)
    }else{
      this.paddle.move(0,0);
    }
  }
};

Paddle.prototype.move = function(x,y){
  this.x += x;
  this.y += y; 
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0){
    this.y = 0;
    this.x_speed = 0;
  }else if(this.y + this.height > 300){
    this.y = 300 - this.height; 
    this.y_speed = 0; 
  }
}

Ball.prototype.update = function(){
  this.x += this.x_speed;
  this.y += this.y_speed; 
}

//adding paddles and the ball 
function Paddle(x,y,width,height){
  this.x = x;
  this.y = y; 
  this.width = width; 
  this.height = height; 
  this.x_speed = 0;
  this.y_speed = 0; 
} 


Paddle.prototype.render = function() {
context.fillStyle = "#00ff00";
context.fillRect(this.x,this.y,this.width,this.height); 
};



function Player(){
  this.paddle = new Paddle(10,140,5,20);
}

function Wall(){
  this.paddle = new Paddle(290,0,5,300)
}

Player.prototype.render = function() {
  this.paddle.render(); 
};

Wall.prototype.render = function() {
  this.paddle.render(); 
}

function Ball(x,y){
  this.x = x;
  this.y = y;
  this.x_speed = -1;
  this.y_speed = 0; 
  this.radius = 2.5; 
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x,this.y,this.radius, 2*Math.PI, false);
  context.fillStyle = "#ffffff"; 
  context.fill(); 
}; 

var player = new Player();
var ball = new Ball(150,150); 
var wall = new Wall(); 

var render = function() {
  context.fillStyle = " #000000";
  context.fillRect(0,0,width,height);
  player.render();
  ball.render(); 
  wall.render(); 
};








