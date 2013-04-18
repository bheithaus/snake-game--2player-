function Controller() {
  this.game = new Game(50);
  this.canvas = document.getElementById('canvas');
  this.context = canvas.getContext('2d');
}

Controller.prototype.drawCircle = function(pos, color) {
  this.context.beginPath();
  this.context.arc(10 * pos[0]+5, 10*pos[1]+5, 5, 0, Math.PI * 2, false);
  this.context.fillStyle = color;
  this.context.fill();
}

Controller.prototype.turn = function(keyCode) {
  console.log(keyCode);
  switch (keyCode) {
    case (37):
      this.game.snake.turn("west");
      break;
    case (38):
      this.game.snake.turn("north");
    //north
      break;
    case (39):
      this.game.snake.turn("east");
    //east
      break;
    case (40):
      this.game.snake.turn("south");
    //south
      break;
  }
}

Controller.prototype.render = function() {
  var controller = this;
  controller.clear();
  controller.drawCircle(this.game.snake.body[0], 'black');
  _.each(this.game.snake.body.slice(1), function(el) {
    controller.drawCircle(el, '#435E3B');
  });
  _.each(this.game.food, function(el) {
    controller.drawCircle(el, '#9C1C1C');
  });
  controller.drawScore();
}

Controller.prototype.clear = function() {
  console.log(this.game.snake.body.length);
  this.context.clearRect(0,0,500,500);
}

Controller.prototype.addHandler = function() {
  var controller = this;
  $('html').keydown(function (event) {
    controller.turn(event.keyCode);
  });
}

Controller.prototype.drawScore = function() {
  var context = this.context;
  context.font = "bold 12px sans-serif";
  context.textAlign = "left";
  context.fillStyle = "black";
  context.fillText("Score: " + this.game.snake.length, 435, 15);
}

Controller.prototype.drawPrompt = function(text, color) {
  var context = this.context;
  context.font = "bold 20px zapfino";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.fillText(text, 250, 250);
}

Controller.prototype.addStartHandler = function() {
  var controller = this;
  $('#canvas').on('click', function() {
    controller.runLoop();
    $(this).off('click');
  });
}

Controller.prototype.runStep = function() {
  var controller = this;
  controller.game.step();
  controller.render();
  if ( !controller.game.lose() ) {
    controller.runLoop();
  } else {
    controller.drawPrompt("You Lose! Click to Restart." , "red");
    controller.reset();
    controller.addStartHandler();
  }
}

Controller.prototype.reset = function() {
  this.game = new Game(50);
}

Controller.prototype.runLoop = function() {
  var controller = this;

  window.setTimeout(function() {
    controller.runStep();
  }, controller.stepTime());
}

Controller.prototype.stepTime = function() {
  console.log(100 - this.game.snake.length);
  return 100 - this.game.snake.length;
}


$(function() {
  var controller = new Controller()
  controller.addHandler();
  controller.addStartHandler();
  controller.drawPrompt("Start Game", "#818267");


  console.log("You pressed keycode: " + event.keyCode);
});