var express = require('express');

var app = express();

app.use(express.static('.'));

app.get('/photos', function (req, res) {
  res.sendFile(__dirname + '/photos-' + req.query.location + '.html');
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});
