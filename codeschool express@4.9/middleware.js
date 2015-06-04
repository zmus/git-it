// When a request comes in, it passes through stack of middleware functions 
// before response. (validation, authentication, data parsing...)

var express = require('express');
var app = express();

// Store middleware function in 'logger'...
var logger = require('./logger');  // './' -> LOCAL module (not an NPM module)

// ...and add it to the stack
app.use(logger);

var bodyParser = require('body-parser');j

// on 'bodyParser' object, call func. that returns parser for URL encoded data 
// { extended: false } forces use of native 'querystring' Node library
var parseUrlencoded = bodyParser.urlencoded({ extended: truej });

var people = {
  'Luka':   'Good and smart', 
  'Martin': 'Makes chocolate',
  'Valnea': 'Loves chocolate'
};
var weight = {
  'Luka':   'Low',
  'Martin': 'Medium',
  'Valnea': 'Nobody knows'
}

/*------------------------------------------------------------------------------ 
  Express-Static Middleware
   - serves everything under the specified folder
   - the only middleware shipped with Express 4
------------------------------------------------------------------------------*/

app.use(express.static('public'));

/*------------------------------------------------------------------------------ 
  POST route
------------------------------------------------------------------------------*/

// Routes can take MULTIPLE HANDLERS as arguments and will call them SEQUENTIALLY:
//    => useful for re-using middleware
// 'parseUrlencoded' runs first and then anonymous func...

app.post('/people', parseUrlencoded, function (req, res) {

  var newPerson = req.body;  // request (form) data
  people[newPerson.name] = newPerson.description;

  res.status(201).json(newPerson.name);  // 201 Created
});

app.delete('/people/:name', function (req, res) {
  if (people[req.personName]) {
    
    // 'delete' operator from JS removes a property from an object
    delete people[req.personName];  // app.param()

    // some clients can't handle empty responses very well (jQuery is one of them)
    // 'sendStatus()' sets both the status code and the response body 
    res.sendStatus(200);  // response body = "OK"
  } else {
    res.sendStatus(404);
  }
});

/*------------------------------------------------------------------------------ 
  Static Routes with Query
   - request.query.limit - access 'limit' query string
   - Object.keys() - returns properties from the object
------------------------------------------------------------------------------*/

app.get('/people', function (req, res) {

  if (req.query.limit >= 0) {
    res.json(Object.keys(people).slice(0, req.query.limit));
  } else {
    res.json(Object.keys(people));
  }
});

// NE RADI!!!
app.get('/people', function (req, res) {

  if (req.query.search) {
    var person = personSearch(req.query.search);
    res.json(person);
  } else {
    res.json('Person not found');
  }
});

function personSearch(keyword) {

  var regexp = RegExp(keyword, 'i');
  var result = people.filter(function (item) {
    return item.match(regexp);
  });
  return result;
}

/*------------------------------------------------------------------------------ 
  Dynamic Routes (reading from the URL)
    - request.params.name - creates 'name' property on the 'req.params' object
------------------------------------------------------------------------------*/

app.get('/people/:name', function (req, res) {

  // 'undefined' when no property is found
  var attribute = people[req.personName];  // app.param()

  if (attribute) {
    res.json(attribute);
  } else {
    res.status(404).json(req.params.name + 'not found.');
  }
});

app.get('/weight/:name', function (req, res) {
  
  var attribute = weight[req.personName];  // app.param()
  
  if (attribute) {
    res.json(attribute); // returns 200 OK with blank response for undefined
  } else {
    res.status(404).json('No weight found for ' + req.params.name);
  }
});

/*------------------------------------------------------------------------------ 
  app.param() - maps placeholders to callback functions
              - useful for running PRE-CONDITIONS on Dynamic Routes
------------------------------------------------------------------------------*/

// called for routes which include the ':name' placeholder
app.param('name', function (request, response, next) {

  // Properties set on the 'request' object can be accessed from other
  // routes in the application
  request.personName = parseName(request.params.name);

  next();
});

function parseName(name) {

  // normalize the request parameter
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

/*----------------------------------------------------------------------------*/

app.listen(3000, function () {
  console.log('Listening on 3000 \n');
});



/*
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');  // pazi __ a ne _
});
*/

/*
get('/users/:name', function (req, res) {
  var name = req.params.name;
};
// GET /users/luka
// => "luka"


get('/users', function (req, res) {
  var name = req.query.name;
};
// GET /users?name=luka&surname=radicek
// => "luka"


post('/users', urlencodedParser, function (req, res) {
  var name = req.body.name; 
});
// POST /users?name=luka&surname=radicek
// => "luka"

*/