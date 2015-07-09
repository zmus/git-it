var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('.'));

app.post('/book', urlencodedParser, function (req, res) {
  req.body.price = req.body.nights * 200;

  /*{
    "location": req.body.location,
    "nights": req.body.nights,
    "totalPrice": req.body.nights * 200
  }*/
  res.send(req.body);
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});
