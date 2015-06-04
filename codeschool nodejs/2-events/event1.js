var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
  response.writeHead(200);
  response.end('<h1>Hello, this is dog</h1>');  
});

server.on('request', function(request, response) {
  console.log("New request coming in...");
});

server.on('close', function() {
  console.log("Closing down the server...");
});

server.listen(8080, console.log("Listening on port 8080..."));