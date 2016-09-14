var express = require('express');
var router = express.Router();
var ctrlDefaults = require("../controllers/default");
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentification');

var cookieParser = require('cookie-parser');

var mySecret = 'cros#nierb@Secret';
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var auth = expressJwt({secret: 'SECRET', userProperty: 'payload'}).unless({ path: [ '/','/login', '/register']});

router.use(cookieParser());

/* GET users listing. */
router.get('/', function(req, res) {
    ctrlDefaults.index(req, res);
});

/*Authentification.js*/
router.post('/register',  function(req, res) {
  ctrlAuth.register(req, res);
});

router.post('/login', function(req, res) {
  ctrlAuth.login(req, res);
});

module.exports = router;
