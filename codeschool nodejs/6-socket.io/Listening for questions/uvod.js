var express = require('express');
var app = express();

// - create an http server 
// - pass the 'express' app as the listener for that new server

var server = require('http').Server(app);

// - using the 'socket.io' module, listen for requests on the 'http' server 
// - store the return object of this operation in 'io'.

var io = require('socket.io')(server);

/*---------- now socket.io and express share the same http server -----------*/

/*
	When a question is submitted to our server, we want to broadcast it out 
	to all the connected clients so they can have a chance to answer it.

	We want to allow each client only one question at a time, so whenever a 
	question is asked, we first want to check the 'question_asked' value on the 
	client.
*/

// - use the object stored in 'io' to listen for client 'connection' events
// - callback takes one argument, which is the client object that has connected

// when a new client connects...
io.on('connection', function(client) {

	console.log('Client connected...');

	// when a client emits an 'answer' to question...
	client.on('answer', function(question, answer) {
		client.broadcast.emit('answer', question, answer);
	});
	
	// when a client emits a 'question'...
	client.on('question', function(question) {
		if (client.question_aksed !== true) {
			client.question_aksed = true;
			// broadcast it to the other clients
			client.broadcast.emit('question', question);
		}
	});
});

server.listen(8080);

