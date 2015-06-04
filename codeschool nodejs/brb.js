var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('rw_file.html');
  file.pipe(response, {end : false});
  response.end(function() {
  	response.write("asdf");
  });
  file.on('end', function() {
  	console.log("Bok!");
  	response.write("<h1>I tebi bok!");
  });

}).listen(8080);
