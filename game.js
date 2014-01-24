/**************************************************
** NODE.JS REQUIREMENTS
**************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
	io = require("socket.io"),				// Socket.IO
	Player = require("./Player").Player;	// Player class


/**************************************************
** GAME VARIABLES
**************************************************/
var socket,		// Socket controller
	players,
	ppl,
	room;	// Array of connected players


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Create an empty array to store players

	players = [];
	ppl = 0;
	room = 0;

	// Set up Socket.IO to listen on port 8000
	socket = io.listen(8000);

	// Configure Socket.IO
	socket.configure(function() {
		// Only use WebSockets
		socket.set("transports", ["websocket"]);

		// Restrict log output
		socket.set("log level", 2);
	});

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Socket.IO
	socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
	util.log("New player has connected: "+client.id);

	// Listen for client disconnected
	client.on("disconnect", onClientDisconnect);

	// Listen for new player message
	client.on("new player", onNewPlayer);

	// Listen for move player message
	client.on("move player", onMovePlayer);

	// Listen for game end
	client.on("game end", onGameEnd);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: "+this.id);
	var removePlayer = playerById(this.id);
	var dcRoom = players[players.indexOf(removePlayer)].room;
	//util.log("from room " + dcRoom);

	// Player not found
	if (!removePlayer) {
		//util.log("Player not found2: "+this.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.to(dcRoom).emit("remove player", {id: this.id, roomNo: dcRoom});
};

function onGameEnd(){
	this.disconnect();
}

// New player has joined
function onNewPlayer(data) {
	ppl++;

	util.log('new');

	// Create a new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;

	this.join(room);

	// Assign room
	this.to(room).emit("select room",{roomNo: room});

	// Broadcast new player to connected socket clients
	this.broadcast.to(room).emit("new player", {id: newPlayer.id,
	 x: newPlayer.getX(), y: newPlayer.getY(), roomNo: room});

	// Send existing players to the new player
	if(players.length != 0 && ppl % 2 == 0)
		this.to(room).emit("new player", {id: players[players.length-1].id,
		 x: players[players.length-1].getX(), y: players[players.length-1].getY()});

	// Add new player to the players array
	players.push(newPlayer);
	if(ppl % 2 == 0) 
		room++;
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		//util.log("Player not found1: "+this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	// Broadcast updated position to connected socket clients
	//util.log("Moved player " + movePlayer.id + " emitted to " + data.roomNo);
	this.broadcast.to(data.roomNo).emit("move player", {id: movePlayer.id, 
		x: movePlayer.getX(), y: movePlayer.getY(), roomNo: data.roomNo});
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	return false;
};


/**************************************************
** RUN THE GAME
**************************************************/
init();