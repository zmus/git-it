/* writes POST request to response */

// Write to a writable stream as soon as you read from a readble stream 

var http = require('http');

http.createServer(function(request, response) {
	
	response.writeHead(200);

	request.pipe(response);  // zamjenjuje donji kod
/* 
	request.on('readable', function() {
		var chunk = null;
		while (null !== (chunk = request.read())) {
			response.write(chunk);
		}
	});
*/
	request.on('end', function() { // ne može samo response.end()... čekamo pipe()
		response.end();
	});

}).listen(8080);