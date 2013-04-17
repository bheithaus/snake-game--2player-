//towers of hanoi
function Hanoi() {
  this.towers = [[3,2,1],[],[]];
}

Hanoi.prototype.valid = function(from, to) {
	from = this.towers[from];
	to = this.towers[to];
	if ( !to[to.length-1] ) {
		return true;
	}
	return from[from.length-1] < to[to.length-1];
}

Hanoi.prototype.moveDisc = function(from, to) {
	if ( this.valid(from, to) ) {
		this.towers[to].push(this.towers[from].pop());
    return true;
	} else {
	  return false;
	}
}

Hanoi.prototype.win = function() {
	if ( this.towers[1].length === 3 || this.towers[2].length === 3 ) {
		return true;
	}
	return false;
}