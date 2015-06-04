var http = require('http');  // How we require modules

http.createServer(function(request, response) {
	response.writeHead(200);         // Status code in header
	response.end("Hello world");     
}).listen(8080);                     // Listen for connections on this port

console.log('Listening on port 8080...');

/*
	response.write("Hello world");    // Response body
	response.end();                   // Close the connection

ekvivalentno:
	
 	response.end("Hello world"); 
 */ 