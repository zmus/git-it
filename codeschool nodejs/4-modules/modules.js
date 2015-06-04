var http = require('http');

// koristimo './' - analogno #include "custom.h" umjesto <> u C-u
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
var makeRequest = require('./custom_make_request');

hello();

http.createServer(function(request, response) {
	request.pipe(process.stdout);
	response.end();
}).listen(8080);

makeRequest("Ide patka preko Save ");

makeRequest("nosi pismo navrh glave");

gb.goodbye();

/* if we only need to call once 
require('./custom_goodbye').goodbye();
*/