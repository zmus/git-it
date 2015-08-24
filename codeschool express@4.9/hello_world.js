/*----------------------------------------------------------------------------- 
	npm init
	npm install express@4 --save

	Express:
		- web application framework for Node
		- minimal and flexible
		- great for building Web APIs

	Express extends Node HTTP objects:
		- request and response objects inherit from Node HTTP
		- lib/request.js
                      var req = exports = module.exports = {
                      	__proto_: http.IncomingMessage.prototype // *
                      };
		- lib/response.js
                      var res = module.exports = {
                      	__proto__: http.ServerResponse.protoype  // *
                      };
		- * objects from Node HTTP
		
	-> we can call Node functions from Express apps 
------------------------------------------------------------------------------*/

var express = require('express');

var app = express();

// 	On the app object (application instance) we can call functions 
//  that create routes.

app.get('/', function (req, res) {
	res.send('Hello world'); 
});

/*------------------------------------------------------------------------------ 
response object methods

	.send()
		- Express API. Same as Node's:
				response.write('Hello world');
		    response.end();

		- sets proper response headers automatically (200, Content-Type)

		- converts: OBJECTS & ARRAYS -> JSON  =  (200, application/json)
		            STRINGS -> HTML           =  (200, text/html)

	.json()
		- for objects and arrays, same response as send() 

	.redirect(code, 'adress')
------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------ 
	.on('event', callback)
		= binds event handler to an object, which emits them

------------------------------------------------------------------------------*/

var shapes = ['Circle', 'Square', 'Triangle'];

app.get('/array_send', function (req, res) {
	res.send(shapes);  // Content-Type: application/json
});

app.get('/array_json', function (req, res) {
	res.json(shapes);  // Content-Type: application/json
});

// server-side rendering... it's better to use EJS or JADE
var colors = '<ul><li>Red</li><li>Green</li><li>Blue</li></ul>';

app.get('/string_send', function (req, res) {
	res.send(colors);  // Content-Type: text/html
});

app.get('/string_json', function (req, res) {
	res.json(colors);  // Content-Type: application/json
});

// 301 Moved Permanently (default: 302 Found)
app.get('/google', function (req, res) {
	res.redirect(301, 'http://google.com');
});

app.listen(3000, function () {
	console.log('Listening on TCP port 3000...');  
});
