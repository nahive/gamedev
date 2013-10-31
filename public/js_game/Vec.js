
var Vec = function(posX, posY) {
	var x = posX,
		y = posY;

	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	return {
		getX: getX,
		getY: getY
	}
};