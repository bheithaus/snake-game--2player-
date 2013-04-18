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
      this.game.snakes[0].turn("west");
      break;
    case (38):
      this.game.snakes[0].turn("north");
    //north
      break;
    case (39):
      this.game.snakes[0].turn("east");
    //east
      break;
    case (40):
      this.game.snakes[0].turn("south");
    //south
      break;
      // Snake 2!
    case (65):
      this.game.snakes[1].turn("west");
      break;
    case (87):
      this.game.snakes[1].turn("north");
    //north
      break;
    case (68):
      this.game.snakes[1].turn("east");
    //east
      break;
    case (83):
      this.game.snakes[1].turn("south");
    //south
      break;
  }
}

Controller.prototype.render = function() {
  var controller = this;
  controller.clear();
  controller.drawCircle(this.game.snakes[0].body[0], 'black');
  _.each(this.game.snakes[0].body.slice(1), function(el) {
    controller.drawCircle(el, '#435E3B');
  });

  controller.drawCircle(this.game.snakes[1].body[0], 'blue');
  _.each(this.game.snakes[1].body.slice(1), function(el) {
    controller.drawCircle(el, '#435E3B');
  });

  _.each(this.game.food, function(el) {
    controller.drawCircle(el, '#9C1C1C');
  });
  controller.drawScore();
}

Controller.prototype.clear = function() {
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
  context.fillText("Score: " + this.game.snakes[0].length, 435, 15);
  context.fillStyle = "blue";
  context.fillText("Score: " + this.game.snakes[1].length, 435, 40);
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
    var losers = controller.game.lose();
    var lostText = "";
    if (losers !== -1) {
      lostText = "Player " + losers + " loses!";
    } else {
      lostText = "Tie game!"
    }
    controller.drawPrompt(lostText + " Click to Restart." , "red");
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
  return 125 - this.game.snakes[0].length - this.game.snakes[1].length;
}


$(function() {
  var controller = new Controller()
  console.log(controller.game.snakes);
  controller.addHandler();
  controller.addStartHandler();
  controller.drawPrompt("Start Game", "#818267");


  console.log("You pressed keycode: " + event.keyCode);
});