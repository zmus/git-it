/* -----------------------------------------------------------------------------
                          Send file to response
----------------------------------------------------------------------------- */

var express = require('express');

var app = express();

app.use(express.static('.'));


app.get('/weather', function (req, res) {
  var fs = require('fs');
  fs.readFile(__dirname + '/weather.json', 'utf8', function (err, data) {
    if (err) throw err;
    res.send(JSON.parse(data)[req.query.q].weather);
  });
});

app.get('/city', function (req, res) {
  var fs = require('fs');
  fs.readFile(__dirname + '/weather.json', 'utf8', function (err, data) {
    if (err) throw err;
    res.send(JSON.parse(data)[req.query.q].city);
  });
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});

