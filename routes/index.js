var express = require('express');
var router = express.Router();
var http = require('http');

router.checkLogin = function(req, res, next) {
  if(!req.session.sid) {
    return res.redirect('/login');
  }
  next();
};

router.checkNotLogin = function (req, res, next) {
    if (req.session.sid) {
        return res.redirect('/');
    }
    next();
}; 

/* GET home page. */
//router.get('/', router.checkLogin);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Summer!' });
});

router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

router.post('/login', function (req, res) {
    var loginUrl = 'http://fr.hhwy.org/sso/loginformobile?loginName=' + req.body.user + '&password=' + req.body.password;
    http.get(loginUrl, function (r) {
        var body = '';
        r.on('data', function (d) {
            body += d;
        });
        r.on('end', function () {
            var parsed = JSON.parse(body);
            req.session.sid = parsed.sessionid;
            res.redirect('/');
        });
    });
});

module.exports = router;
