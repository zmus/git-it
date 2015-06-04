/* Read content from POST REQUEST and stream it to a FILE */

var http = require('http');
var fs = require('fs');  // require filesystem module

http.createServer(function(request, response) {
	var newFile = fs.createWriteStream("write.txt");
	// Size of the file
	var fileBytes = request.headers['content-length'];
	// How many bytes were uploaded...
	var uploadedBytes = 0;
	// Listening to the 'readable' event, loops through and reads each of 
	// chunks from the request
	
	request.on('readable', function() {
		var chunk = null;  
		while (null !== (chunk = request.read())) {
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes / fileBytes) * 100;
			response.write("progress: " + parseInt(progress, 10) + "%\n");
			newFile.write(chunk);
		}
	}); 

	// request.pipe(newFile);  // simpler without progress

	request.on('end', function() {
		response.end('uploaded!');
	});
}).listen(8080);


