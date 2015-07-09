var express = require('express');
var bodyParser = require('body-parser')

var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('.'));

app.post('/book', urlencodedParser, function (req, res) {
  var destination = req.body.destination;
  var nights = req.body.quantity;
  console.log(destination);
  res.send('<p>Your vacation to ' + destination +  ' has been booked for $' 
            + nights * 100 + ' for ' + nights + ' nights.');
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});
