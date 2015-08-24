// variables have to come before we use them

var express = require('express');
var app = express();

app.use(express.static('public'));

var items = require('./routes/items');
var prices = require('./routes/prices');
var dates = require('./routes/dates');

app.use('/items', items);
app.use('/prices', prices);
app.use('/blocks', blocks);

app.listen(3000, function () {
  console.log('Listening on 3000 \n');
});