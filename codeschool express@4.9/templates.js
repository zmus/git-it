var express = require('express');
var app = express();

app.param('param_name', function (req, res, next) {
  next();
});

app.use(['/path'], );

app.get('/url/:parameter', function (req, res) {
  req.params.parameter;
  res.json(); // 200 OK
  res.status(404).json('');  // 404 does not exist
});

app.post('/url', parseUrlencoded, function (req, res) {
  req.body.parameter1
  req.body.parameter2...
  res.status(201).json(''); // 201 Created 
});

app.delete('/url/:parameter', function (req, res) {
  if (object[req.params.name]) {
    delete object[req.params.name];
    res.sendStatus(200);  // 200 OK
  } else {
    res.sendStatus(404);  //40 4 does not exist
  }
});

app.listen(3000, function () {
  console.log('');
});

function validate(value) {
  var regexp = RegExp(/^d{4}$/);
  return regexp.test(value);
}

app.route('/url')
  .all(function (req, res, next) {})  // all HTTP verbs 
  .get(function (req, res) {})
  .post(parseUrlencoded, function (req, res) {});

app.route('/url/:parameter')
  .all(function (req, res, next) {})  // === app.param()
  .get(function (req, res) {})
  .delete(function (req, res) {});

////////////////////////////////////////////////////////////////////////////////

var router = express.Router();

router.route('/')
  .get(function (req, res) {})
  .post(parseUrlencoded, function (req, res) {});

router.route('/:parameter')
  .get(function (req, res) {})
  .delete(function (req, res) {});

app.use('/cities', router);  // use middleware on the '/cities' route
