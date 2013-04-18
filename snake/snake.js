function Game(boardSize) {
  this.boardSize = boardSize;
  this.snake = new Snake(Math.floor(boardSize/2));
  this.food = [this.randomCoord()];
}

Game.prototype.step = function () {
  this.snake.move();
  this.hitEdge();
  if ( this.hitFood() ) {
    console.log('yum');
    this.snake.eat();
    this.food.pop();
    this.generateFood(1);
  }
}

Game.prototype.randomCoord = function() {
  return [Math.floor(Math.random() * this.boardSize),
                    Math.floor(Math.random() * this.boardSize)];
}

Game.prototype.generateFood = function(amount) {
  var game = this;

  _.times(amount, function() {
    newFood = game.randomCoord();
    while ( _.include(game.snake.body, newFood) ) {
      newFood = game.randomCoord();
    }
    game.food.push(newFood);
  });
}

Game.prototype.hitFood = function() {
  return includes(this.food, this.snake.body[0]);
}

Game.prototype.lose = function() {
  return this.snake.oroborus();
}

Game.prototype.hitEdge = function() {
  this.snake.body[0][0] += this.boundsOneWay(this.snake.body[0][0])*this.boardSize;
  this.snake.body[0][1] += this.boundsOneWay(this.snake.body[0][1])*this.boardSize;
}

Game.prototype.boundsOneWay = function(position) {
  if ( position < 0 ) {
    return 1;
  } else if (position >= this.boardSize) {
    return -1;
  } else {
    return 0;
  }
}

function Snake(start) {
  this.length = 5;
  this.body = [[start, start]];
  this.oldDirection = [1,0];
  this.direction = [1,0];
}

Snake.prototype.oroborus = function() {
  var head = this.body[0];
  return includes(this.body.slice(1), head);
}

Snake.prototype.move = function() {
  this.oldDirection = this.direction;
  var newPosition = this.addVector(this.body[0], this.direction);
  this.body.unshift(this.addVector(this.body[0], this.direction));
  if (this.body.length > this.length) {
    this.body.pop();
  }
}

Snake.prototype.eat = function() {
  this.length += 1;
}

Snake.prototype.addVector = function(position, vector) {
  return [position[0] + vector[0], position[1] + vector[1]];
}

Snake.prototype.turn = function(cardinals) {
  var newDirection;
  switch (cardinals) {
    case "east":
      newDirection = [1, 0];
      break;
    case "west":
      newDirection = [-1, 0];
      break;
    case "north":
      newDirection = [0, -1];
      break;
    case "south":
      newDirection = [0, 1];
      break;
  }

  if (this.compareCoord(this.addVector(newDirection, this.oldDirection),[0,0])) {
    return false;
  } else if (this.compareCoord(newDirection, this.oldDirection)) {
    return false;
  } else {
    this.direction = newDirection;
    return true;
  }
}

Snake.prototype.compareCoord = function(coord1, coord2) {
  if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
    return true;
  }
  return false;
}


//library functions
var includes = function(arr, target) {
  return _.some(arr, function(el) {
    return target[0] === el[0] && target[1] === el[1]
  });
}
// game = new Game(50);
// console.log(game.snake.body);
// console.log(game.food);
// game.step();
// console.log("Step");
// console.log(game.snake.body);
// console.log(game.food);
// game.snake.turn("south");
// game.step();
// console.log(game.snake.body);
// console.log(game.food);
// game.step();
// console.log("Step");
// console.log(game.snake.body);
// console.log(game.food);
// game.snake.turn("east");
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.step();
// game.snake.turn("north");
// console.log("Step");
// console.log(game.snake.body);
// console.log(game.food);