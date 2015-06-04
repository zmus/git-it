var events = require('events');
var EventEmitter = events.EventEmitter; // klasa -> veliko početno slovo

var chat = new EventEmitter();
var users = [], chatlog = [];


chat.on('message', function(message) {
  chatlog.push(message);
});

chat.on('join', function(nickname) {
  users.push(nickname);
});


// Emit events here
chat.emit('message', 'bok');
chat.emit('join', 'Luka');

console.log(users[0] + ' ' + chatlog[0]);


var server = require('http').createServer();

server.on('request', function(req, res) {
	res.writeHead(200);
	res.end('<h1>' + users[0] + ' ' + chatlog[0]);
});

server.listen(8080);
  