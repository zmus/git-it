var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var redis = require('redis');
var redisClient = redis.createClient();

var colors = ["red", "green", "blue"];
var store = [];
var users = []; 

var storeMessage = function (nickname, color, message) {
	// need to turn object into string to store in redis
	var item = JSON.stringify({nickname: nickname, color: color, message: message});
	redisClient.lpush("store", item, function (err, response) {
		// keep newest 10 items
		redisClient.ltrim("store", 0, 10);
	});
};

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

// when client connects...
io.on('connection', function (socket) {

	socket.color = colors[0];
	colors.push(colors[0]);
	colors.shift();

	socket.on('join', function (nickname) {
		socket.nickname = nickname;
		socket.broadcast.emit('user joined', socket.nickname);

		redisClient.lrange("store", 0, -1, function (err, messages) {
			 messages = messages.reverse();
		});
		// add nick  to 'users' set
		redisClient.sadd("users", socket.nickname);

		store.forEach(function (item) {
			item = JSON.parse(item);  // parse into JSON object
			socket.emit('new message', item);
		});

		redisClient.smembers('users', function (err, users) {
			users.forEach(function (user) {
				socket.emit('user joined', user);
			});
		});
	});

	socket.on('disconnect', function () {
		if (socket.nickname) {

			users.splice(users.indexOf(socket.nickname), 1);
		}
		socket.broadcast.emit('user left', socket.nickname);
	});

	socket.on('typing', function () {
		socket.broadcast.emit('typing', socket.nickname);
	});

	socket.on('new message', function (message) {
		io.emit('new message', { nickname: socket.nickname, color: socket.color, message: message });
		storeMessage(socket.nickname, socket.color, message);
	});

});

http.listen(3000, function () {
	console.log('listening on *:3000');
});
