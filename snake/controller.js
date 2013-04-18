//stuff

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
  switch (keyCode) {
    case (38):
      this.game.snake.turn("west");
      break;
    case (39):
      this.game.snake.turn("north");
    //north
      break;
    case (40):
      this.game.snake.turn("east");
    //east
      break;
    case (37):
      this.game.snake.turn("south");
    //south
      break;
  }
}
Controller.prototype.render = function() {
  var controller = this;
  controller.clear();
  _.each(this.game.snake.body, function(el) {
    controller.drawCircle(el, '#000000');
  });
  _.each(this.game.food, function(el) {
    controller.drawCircle(el, '#FFFFFF');
  });
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


$(function() {
  var controller = new Controller()
  controller.addHandler();

  STEP_TIME_MILLIS = 100;

  function run_step() {
    console.log("RUNNING");
    controller.game.step();
    controller.render();
    run_loop();
  }
  function run_loop() {
     window.setTimeout(run_step, STEP_TIME_MILLIS);
  }
  run_loop();
  console.log("You pressed keycode: " + event.keyCode);
});