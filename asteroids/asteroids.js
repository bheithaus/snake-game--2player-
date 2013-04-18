function Asteroid(radius, pos, vector) {
  this.radius = radius;
  this.position = pos;
  this.vector = vector;
}

Asteroid.prototype.move = function() {
  //modify position by vector

}

Asteroid.prototype.damage = function(amount) {
  //radius reduced by amount
}

function Bullet(radius, pos, vector) {
  this.radius = radius;
  this.position = pos;
  this.vector = vector;
}

function Ship() {
  this.radius = 10;
  this.position = [250, 250];
  this.vector = [0,0]; //two element array, can grow by
  this.direction = Math.PI/2; //radians
  this.turning = 0;
  this.accelerating = false;
}

Ship.prototype.turn = function(cardinal) {
  if (cardinal === -1) {
    this.direction -= 0.2;
  } else {
    this.direction += 0.2;
  }
}

Ship.prototype.accelerate = function() {
  this.vector = helpers.addCoords(this.vector,
          helpers.scaleArray(helpers.convertDirection(this.direction), .45));
  // change vector
  // based on vector and direction
}

Ship.prototype.move = function() {
  if (this.accelerating) {
    this.accelerate();
  }
  this.direction += 0.2 * this.turning;
  this.position = helpers.move(this);
  this.decayVector(.98);
  //change position based on vector & velocity
  // decay velocity
}

Ship.prototype.decayVector = function (scalar) {
  this.vector = helpers.scaleArray(this.vector, scalar);
}

//Ship.prototype.convertDirection = function() {
  // returns vector based on direction in radians
//}

Ship.prototype.shoot = function() {
  //return bullet with pos = ship + direction offset,
  //vector == ships direction
  //radius == gun dependent
}

var helpers = (function() {

  var convertDirection = function (radians) {
    return [Math.cos(radians), Math.sin(radians)];
    //return vector
  }
  var move = function(object) {
    return helpers.addCoords(object.position, object.vector);
    //object.position += object.vector
  }
  var scaleArray = function(array, scalar) {
    return [array[0] * scalar, array[1] * scalar];
  }

  var addCoords = function(coord1, coord2) {
    return [coord1[0] + coord2[0], coord1[1] + coord2[1]];
  }

  return {
    convertDirection: convertDirection,
    move: move,
    addCoords: addCoords,
    scaleArray: scaleArray
  }
})();

function Game(length) {
  this.asteroids = [];
  this.ship = new Ship();
  this.bullets = [];
  this.length = length;
  this.lives = 3;
}


Game.prototype.update = function() {
  this.updateShip();
  // update bullets
  // update ship
  // update asteriods
}

Game.prototype.checkCollision = function(obj1, obj2) {
  //test for collision return true or false

}

Game.prototype.randomAsteroid = function() {
  //spawns a new random asteroid (off screen)

}

Game.prototype.spawnShip = function() {
  // lives --
  // spawn ship at some place on screen
}

Game.prototype.shootBullet = function() {
  // calls on ship.shoot, pushes into bullets array
}

Game.prototype.checkBounds = function(object) {
  positionVector = object.position.slice(0);
  if (object.position[0]+object.radius <= 0) {
    positionVector[0] = this.length - object.radius;
  } else if (object.position[0]-object.radius >= this.length) {
    positionVector[0] = object.radius;
  }

  if (object.position[1]+object.radius <= 0) {
    positionVector[1] = this.length - object.radius;
  } else if (object.position[1]-object.radius >= this.length) {
    positionVector[1] = object.radius;

  }
  return positionVector;
  // check based on radius & borders
  // returns true or false
}

Game.prototype.updateBullets = function() {
  // loop through bulelts
  //bullet.move
  //check collision with asteroids, if collision, reduce asteroid radius
    // remove asteroid if radius below certain threshold
  //check bounds, remove if out of bounds
}

Game.prototype.updateShip = function() {
  this.ship.move();
  this.ship.position = this.checkBounds(this.ship);
  //check bounds and move to other side if out of bounds
  // check collision asteroids
}

Game.prototype.updateAsteroids = function() {
  //loop through asteroids
  //asteroid.move
  //check bounds
}

Game.prototype.lose = function() {
  // return true if lives < 0
}


