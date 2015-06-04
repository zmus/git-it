// express initializes 'app' to be a function handler...

var app = require('express')();

// ...that you can supply to an HTTP server

var http = require('http').Server(app);

// initialize a new instance of 'socket.io' by passing the 'http' object

var io = require('socket.io')(http);  // CREATE NEW SERVER

// define a route handler '/' that gets called when we hit our website home

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

	console.log('a user connected');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('chat message', function (msg) {
		// send message to everyone, including the sender
		io.emit('chat message', msg);
	});

});

http.listen(3000, function () {
	console.log('listening on *:3000');
});