function Controller(canvas) {
  console.log(canvas);
  this.context = canvas.getContext('2d');
  this.game = new Game(500);
}

Controller.prototype.render = function() {
  this.clear();
  this.renderShip();
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
    console.log("left");
      this.game.ship.turning = -1;
      break;
    case (38):
    console.log("accelerate");
      this.game.ship.accelerating = true;
      break;
    case (39):
    console.log("right");
      this.game.ship.turning = 1;
      break;
    //case (40):
  }
}

Controller.prototype.stopTurn = function(keyCode) {
  switch (keyCode) {
    case (37):
    console.log("left");
      this.game.ship.turning = 0;
      break;
    case (38):
    console.log("accelerate");
      this.game.ship.accelerating = false;
      break;
    case (39):
    console.log("right");
      this.game.ship.turning = 0;
      break;
    //case (40):
  }
}
//
// Controller.prototype.handleAcceleration = function(keyCode) {
//   switch (keyCode) {
//     case (38):
//     console.log("accelerate");
//       this.game.ship.accelerate();
//       break;
//     //case (40):
//   }
// }


Controller.prototype.renderShip = function() {
  var ship = this.game.ship;
  var ctx = this.context;
  ctx.beginPath();
  ctx.arc(ship.position[0],
          ship.position[1],
          ship.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = 'black';
    ctx.fill();

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(ship.position[0], ship.position[1]);
  var directionVector = helpers.convertDirection(ship.direction);
  //console.log(directionVector);
  var x = directionVector[0]*15 + ship.position[0];
  var y = directionVector[1]*15 + ship.position[1];
  ctx.lineTo(x, y);
  ctx.stroke();
}

Controller.prototype.renderAsteroids = function() {


}

Controller.prototype.renderBullets = function() {


}




Controller.prototype.clear = function() {
  this.context.clearRect(0, 0, 500, 500);
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
  controller.addEventHandler();
  (function animloop(){
    requestAnimFrame(animloop);
    controller.game.update();
    controller.render();
  })();



});
