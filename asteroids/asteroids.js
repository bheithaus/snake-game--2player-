function Asteroid(radius, pos, vector) {
  this.radius = radius;
  this.position = pos;
  this.vector = vector;
  this.color = this.randomColor();
}

Asteroid.prototype.randomColor = function() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

Asteroid.prototype.move = function() {
  this.position = helpers.move(this);
}

Asteroid.prototype.damage = function(amount) {
  this.radius = this.radius - amount < 10 ? 0 : this.radius - amount;
}

function Bullet(radius, pos, vector) {
  this.radius = radius;
  this.position = pos;
  this.vector = vector;
}
Bullet.prototype.move = function() {
  this.position = helpers.move(this);
}

function Ship() {
  this.radius = 10;
  this.position = [250, 250];
  this.vector = [0,0]; //two element array, can grow by
  this.direction = Math.PI/2; //radians
  this.turning = 0;
  this.accelerating = false;
  this.firing = false;
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
}

Ship.prototype.move = function() {
  if (this.accelerating) {
    this.accelerate();
  }
  this.direction += 0.2 * this.turning;
  this.position = helpers.move(this);
  this.decayVector(.98);
}

Ship.prototype.decayVector = function (scalar) {
  this.vector = helpers.scaleArray(this.vector, scalar);
}

Ship.prototype.shoot = function() {
  return new Bullet(2, this.position,
    helpers.scaleArray(helpers.convertDirection(this.direction), 7));
}