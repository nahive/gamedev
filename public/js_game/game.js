/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	room,			// Room
	socket,
	enemyPositions;			// Socket connection

var ended = false;
var won = false;


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximise the canvas
	canvas.width = 800;
	canvas.height = 600;

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen

	var startX = Math.round(Math.random()*(canvas.width-15)), // do wymyslenia jak zaczynac w rogach 
		startY = Math.round(Math.random()*(canvas.height-15));

	// Initialise the local player
	localPlayer = new Player(startX, startY);

	// Initialise socket connection
	socket = io.connect("localhost/", {port: 8000, transports: ["websocket"]});

	// Initialise remote players array
	remotePlayers = [];

	enemyPositions = [];

	console.log("polaczylem");
	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);


	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);

	socket.on("select room", onSelectRoom);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Socket assigned room
function onSelectRoom(data){
	console.log("In a room " + data.roomNo);
	room = data.roomNo;
};

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");
	ended = false;
	won = false;
	// Send local player data to the game server
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	// Initialise the new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = data.id;


	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
};

// Move player
function onMovePlayer(data) {
	if(data.roomNo == room){
		var movePlayer = playerById(data.id);
		// console.log('Recieved movement of ' + data.id + " from room " + data.roomNo + ", but my room " + room);
		// Player not found
		if (!movePlayer) {
			console.log("Player not found3: "+data.id);
			return;
		};

		enemyPositions.push(new Vec(data.x, data.y));
		// Update player position
		movePlayer.setX(data.x);
		movePlayer.setY(data.y);
	}
};

// Remove player
function onRemovePlayer(data) {
		var removePlayer = playerById(data.id);

		// Player not found
		if (!removePlayer) {
			// console.log("Player not foun4: "+data.id);
			return;
		};

		// Remove player from array
		remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
		ended = true;
		won = true;
		socket.emit("game end");

	
		youWon();
	
};

function youWon() {
	console.log('wygrales');
	gameEnd(1);
};

function youLost() {
	console.log('przegrales');
	gameEnd(0);
}


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	if(!ended){
		update();
		draw();
		// Request a new animation frame using Paul Irish's shim
		window.requestAnimFrame(animate);
	} else if (!won) {
		socket.emit("game end");
		youLost();
	}
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), roomNo: room});
	};
	if(localPlayer.checkCollisions(enemyPositions)){
		ended = true;
	}
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the local player
	localPlayer.draw(ctx, enemyPositions);

	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(ctx, enemyPositions);
	};
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};