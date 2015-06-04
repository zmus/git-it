// Express is Sinatra inspired (web development framework for Ruby)

// 'npm install --save express' Installs the module and adds to package.json

var express = require('express');
var app = express();

app.get('/', function(request, response) {         // '/' = root route
	// read in a file from our file system and send it back with the response
	response.sendFile(__dirname + "/index.html");  // __dirname = current directoy
});

app.listen(8080);
