/* Sends 'message' to localhost:8080 using POST method */

var http = require('http');

var makeRequest = function(message) {
	var options = {
		host: 'localhost', port: 8080, path: '/', method: 'POST'
	}
	var request = http.request(options);
	// begins request (write data to the request)
	request.write(message);
	// finishes request (we only want to write one message)
	request.end();
}

module.exports = makeRequest;


/* alternativni način... ne znam kaj radi :) 

	// callback function will be executed when the response returns
	var request = http.request(options, function(response) {
		// when 'data' event gets received, log response body
		response.on('data', function(data) {
			console.log(data);
		});
	});

*/



