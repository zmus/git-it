var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.parseUrlencoded({ extended: false });

router.route('/')
  .get(function (req, res) {})
  .post(parseUrlencoded, function (req, res) {});

router.route('/:name')
  .all(function (req, res, next) {}) // === app.param('name', ...  
  .get(function (req, res) {})
  .delete(function (req, res) {});

module.exports = router;