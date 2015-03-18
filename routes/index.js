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

router.get('/logo', function(req, res, next) {
  var logo = {};
  logo.url = 'images/logo.png';
  logo.title = '小微企业ERP云平台';
  logo.href = 'http://minierp.hhwy.org/minierp';
  res.send(logo);
  res.end();
});

router.get('/user', function(req, res, next) {
  var user = {};
  user.photo = 'images/user.jpg';
  user.name = '孙敏杰';
  res.send(user);
  res.end();
});

module.exports = router;
