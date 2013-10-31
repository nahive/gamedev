/**************************************************
** GAME KEYBOARD CLASS
**************************************************/
var Keys = function(up, left, right, down) {
	var up = up || false,
		left = left || false, // do poprawy zaleznie od pozycji startowej
		right = right || false,
		down = down || false;
		
	var onKeyDown = function(e) {
		var that = this,
			c = e.keyCode;
		switch (c) {
			// Controls
			case 37: // Left
				if (that.right != true) {
					that.left = true;
					that.up = false;
					that.right = false;
					that.down = false;
				}
				break;
			case 38: // Up
				if (that.down != true) {
					that.left = false;
					that.up = true;
					that.right = false;
					that.down = false;
				}
				break;
			case 39: // Right
				if (that.left != true) {
					that.left = false;
					that.up = false;
					that.right = true;
					that.down = false;
				}
				 // Will take priority over the left key
				break;
			case 40: // Down
				if (that.up != true) {
					that.left = false;
					that.up = false;
					that.right = false;
					that.down = true;
				}
				break;
		};
	};

	return {
		up: up,
		left: left,
		right: right,
		down: down,
		onKeyDown: onKeyDown		
	};
};