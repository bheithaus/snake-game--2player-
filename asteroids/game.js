
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function Game(length) {
  this.asteroids = [];
  this.ship = new Ship();
  this.bullets = [];
  this.length = length;
  this.lives = 3;
  this.alive = true;
}


Game.prototype.update = function() {
  this.updateShip();
  this.updateBullets();
  this.updateAsteroids();
  this.checkCollisions();
}

Game.prototype.checkCollisions = function() {
  var ship = this.ship;
  var asteroids = this.asteroids;
  var bullets = this.bullets;
  for (var i = 0; i < asteroids.length; i++) {
    if ( helpers.collision(ship, asteroids[i]) ){
      this.alive = false;
    }
  }
  var deleteAsteroids = [];
  var deleteBullets = [];
  for (var i = 0; i < asteroids.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
      if ( helpers.collision(bullets[j], asteroids[i]) ){
        asteroids[i].damage(1);
        deleteBullets.push(j);
        if (asteroids[i].radius > 0) {
          deleteAsteroids.push(i);
        }
      }
    }
  }
  var game = this;
  _.each(deleteAsteroids, function (index) {
    game.asteroids.remove(index);
    game.randomAsteroid();
  });
  _.each(deleteBullets, function (index) {
    game.bullets.remove(index);
  });
}

Game.prototype.randomAsteroid = function() {
  var pos, radius, vector;
  radius = 10 + Math.random() * 30;
  vector = helpers.scaleArray([Math.random(), Math.random()],
                               3 + Math.random() * 3);
  pos = [Math.random() * this.length, - 100 + Math.random() * 30];

  this.asteroids.push(new Asteroid(radius, pos, vector));
}

Game.prototype.spawnAsteroids = function(n) {
  for (var i = 0; i < n; i++) {
    this.randomAsteroid();
  }
}

Game.prototype.spawnShip = function() {
}

Game.prototype.shootBullet = function() {
  this.bullets.push(this.ship.shoot());
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
}

Game.prototype.updateBullets = function() {
  var bullets = this.bullets;
  var newBullets = [];
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move();
    if (helpers.compareCoord(bullets[i].position,
                         this.checkBounds(bullets[i]))) {
      newBullets.push(bullets[i]);
    }
  }
  this.bullets = newBullets;
}

Game.prototype.updateShip = function() {
  this.ship.move();
  this.ship.position = this.checkBounds(this.ship);
  if (this.ship.firing) {
    this.shootBullet();
  }
}

Game.prototype.updateAsteroids = function() {
  var asteroids = this.asteroids;
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].move();
    // console.log(asteroids[i].position);
    asteroids[i].position = this.checkBounds(asteroids[i]);
    // console.log(asteroids[i].position);
  }
}

Game.prototype.lose = function() {
  // return true if lives < 0
}
