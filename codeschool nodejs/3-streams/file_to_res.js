/* file server */

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {

  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('index.html');

  file.pipe(response, {end : false});
  // without {end: false} will throw an error because pipe automatically 
  // closes our writable stream
  file.on('end', function() {
  	console.log("Bok!");
  	response.write("<h1>I tebi bok!</h1>");
  });

}).listen(8080);
