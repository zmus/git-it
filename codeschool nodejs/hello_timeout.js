var http = require('http');  

http.createServer(function(request, response) {  // REQUEST EVENT
	response.writeHead(200);         
	response.write("Dog is running.");  
	// TIMEOUT EVENT (represents long running process)
	setTimeout(function() { // callback executes after 5s
		response.write("Dog is done.");
		response.end();
	}, 5000);    
}).listen(8080);  

console.log('Listening on port 8080...');