var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Summer!' });
});

router.get('/test', function(req, res, next) {
  var item = {};
  item.a = 1;
  item.b = 2;
  res.send(item);
  res.end();
});

module.exports = router;
