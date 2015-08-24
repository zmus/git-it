// Express is Sinatra inspired (web development framework for Ruby)

// 'npm install --save express' Installs the module and adds to package.json

var express = require('express');
var app = express();

app.get('/', function(request, response) {         
	// read in a file from our file system and send it back with the response
	response.sendFile(__dirname + "/index.html"); 
});

app.listen(8080);


/*-------
paths

  '/' + 'name' 
    = URL (for HTTP methods)
    * '/' = root route
    * '/name:parameter' = GET http://name/person
  
  'name' 
    = directory 
    * '__dirname' 
        = current directory
    * './' 
        = LOCAL module (not an NPM module) 
        * require(./module);
*/

/*  
  app.listen {
    GET name
      app.get('/name/:params', middleware [app.use(next), app.param(next)], callback[res.send]);
    POST name 
     app.post('/name/:params', middleware [app.use(next), app.param(next)], callback[res.send]);
   ...
  }
*/