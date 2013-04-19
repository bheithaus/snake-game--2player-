function Controller(canvas) {
  this.context = canvas.getContext('2d');
  this.game = new Game(500);
}

Controller.prototype.render = function() {
  this.clear();
  this.renderBullets();
  this.renderShip();
  this.renderAsteroids();

  //render ship
  //render asteroids
  //render bullets


}

Controller.prototype.addEventHandler = function() {
  var controller = this;
  $('html').keydown(function (event) {
      controller.startTurn(event.keyCode);
  });
  $('html').keyup(function (event) {
      controller.stopTurn(event.keyCode);
  });
}

Controller.prototype.startTurn = function(keyCode) {
  switch (keyCode) {
    case (37):
    //console.log("left");
      this.game.ship.turning = -1;
      break;
    case (38):
    //console.log("accelerate");
      this.game.ship.accelerating = true;
      break;
    case (39):
    //console.log("right");
      this.game.ship.turning = 1;
      break;
    case (32):
    // console.log("firing!!");
      this.game.ship.firing = true;
      break;
    //case (40):
  }
}

Controller.prototype.stopTurn = function(keyCode) {
  switch (keyCode) {
    case (37):
      this.game.ship.turning = 0;
      break;
    case (38):
      this.game.ship.accelerating = false;
      break;
    case (39):
      this.game.ship.turning = 0;
      break;
    case (32):
    // console.log("not!!");
      this.game.ship.firing = false;
      break;
    //case (40):
  }
}

Controller.prototype.drawCircle = function(obj, color) {
  var ctx = this.context;
  ctx.beginPath();
  ctx.arc(obj.position[0],
          obj.position[1],
          obj.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = color;
  ctx.fill();
}

Controller.prototype.renderShip = function() {
  var ship = this.game.ship;
  var ctx = this.context;
  this.drawCircle(ship, "black");
  //gun
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(ship.position[0], ship.position[1]);
  var directionVector = helpers.convertDirection(ship.direction);
  var x = directionVector[0]*15 + ship.position[0];
  var y = directionVector[1]*15 + ship.position[1];
  ctx.lineTo(x, y);
  ctx.stroke();
}

Controller.prototype.renderAsteroids = function() {
  var asteroids = this.game.asteroids;
  for (var i = 0; i < asteroids.length; i++) {
    this.drawCircle(asteroids[i], asteroids[i].color);
  }
}

Controller.prototype.renderBullets = function() {
  var bullets = this.game.bullets;
  for (var i = 0; i < bullets.length; i++) {
    this.drawCircle(bullets[i], "red");
  }
}

Controller.prototype.drawPrompt = function(text, color) {
  var context = this.context;
  context.font = "bold 20px zapfino";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.fillText(text, 250, 250);
}

Controller.prototype.bindClickHandler = function() {
  var controller = this;
  $('html').on('click', function() {
    controller.reset();
    $(this).off('click');
  });
}

Controller.prototype.reset = function() {
  this.game = new Game(500);
  this.game.spawnAsteroids(10);
}


Controller.prototype.clear = function() {
  this.context.clearRect(0, 0, 500, 500);
}

Controller.prototype.animLoop = function() {
  var controller = this;
  // console.log(this);
  if (controller.game.alive) {
    window.requestAnimFrame(controller.animLoop.bind(controller));
    controller.game.update();
    controller.render();
  } else {
    controller.bindClickHandler();
    controller.drawPrompt("LOSER", 'black');
  }
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 500 / 60);
          };
})();

$(function() {
  var canvas = $('<canvas width="500" height="500"></canvas>');
  canvas.appendTo($('body'));
  var controller = new Controller(canvas.get(0));
  controller.game.spawnAsteroids(10);
  // console.log(controller.game.asteroids);
  controller.addEventHandler();
  controller.animLoop();



});
