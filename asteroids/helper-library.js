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

  var compareCoord = function(coord1, coord2) {
    if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
      return true;
    }
    return false;
  }

  var includes = function(arr, target) {
    return _.some(arr, function(el) {
      return target[0] === el[0] && target[1] === el[1]
    });
  }
  var distance = function(obj1, obj2) {
    var deltaX = obj1.position[0] - obj2.position[0];
    var deltaY = obj1.position[1] - obj2.position[1];
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
  }
  var collision = function(obj1, obj2) {
    var dist = distance(obj1, obj2);
    var radii = obj1.radius + obj2.radius;
    if (radii > dist) {
      return true;
    } else {
      return false;
    }
  }
  return {
    convertDirection: convertDirection,
    move: move,
    addCoords: addCoords,
    scaleArray: scaleArray,
    compareCoord: compareCoord,
    includes: includes,
    distance: distance,
    collision: collision
  }
})();