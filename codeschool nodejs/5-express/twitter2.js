// NE RADI
// dohvaća twetove od codeschool-a

var url = require('url');
var request = require('request');
var express = require('express');

var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: {q: "codeschool"}
};


var searchURL = url.format(options);
console.log(searchURL);


request(searchURL, function(error, response, body) {
  console.log(body);
});


var app = express();  // create express server

app.get('/', function(req, res) {
  request(searchURL).pipe(res);
});


app.listen(8080);