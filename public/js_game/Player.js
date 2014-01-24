/**************************************************
** GAME PLAYER CLASS
**************************************************/

var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 1,
		positions = [];
	
	// Getters and setters
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

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		positions.push(new Vec(prevX, prevY));

		// Up key takes priority over down
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx, enemyPositions) {
		ctx.save()
		ctx.scale(1,1);
		ctx.beginPath();
		ctx.arc(x-3, y-3, 7, 0, Math.PI*2, false);
		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.lineWidth = 10;
		ctx.strokeStyle = "#fff";
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		for(var i = 0; i < positions.length; i++){
			ctx.fillStyle = "#fff";
			ctx.fillRect(positions[i].getX()-10, positions[i].getY()-10, 5,5);
		}

		for(var i = 0; i < enemyPositions.length; i++){
			ctx.fillStyle = "#fff";
			ctx.fillRect(enemyPositions[i].getX()-10, enemyPositions[i].getY()-10, 5,5);
		}
	};

	var checkCollisions = function(enemyPositions){
		for(var i = 0; i < enemyPositions.length; i++){
			if(x == enemyPositions[i].getX() && y == enemyPositions[i].getY())
				return true;
		}
		
		if(x > 799 || x < 1 || y < 1 || y > 599)
			return true;
		return false;
	}

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,
		draw: draw,
		id: id,
		checkCollisions: checkCollisions
	}
};