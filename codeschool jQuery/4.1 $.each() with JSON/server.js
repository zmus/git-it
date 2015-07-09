/* -----------------------------------------------------------------------------
                          Send file to response
----------------------------------------------------------------------------- */

var express = require('express');

var app = express();

app.use(express.static('.'));


app.get('/cities/favorite', function (req, res) {
  res.sendFile(__dirname + '/photos.json');
  /*
  var fs = require('fs');
  fs.readFile(__dirname + '/photos.json', function (err, data) {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
  */
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});
