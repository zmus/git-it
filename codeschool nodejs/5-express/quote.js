/*
	Render the response using ESJ template...
	Installs the module and adds to package.json: $ npm install --save ejs
*/

var express = require('express');
var app = express();

// JS object
var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

// accessing object properties:  quotes.name  ||  quotes["name"]

app.get('/quotes/:name', function(req, res) {
  // renders a view and sends the rendered HTML string to the client (express)
  var name = req.params.name;  // => "name"
  res.render('quote.ejs', {
    name: name,
    quote: quotes[name]  
  });
});

app.listen(8080);



// alternativno; samo quote
/*  
      app.get('/quotes/:name', function(req, res) {
        res.end(quotes[req.params.name]);
      });
*/
