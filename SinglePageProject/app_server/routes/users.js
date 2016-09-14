var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentification');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  ctrlUsers.usersReadAll();
});

router.put('/users/:userid', function(req, res, next) {
  ctrlUsers.usersUpdateOne();
});

router.delete('/users/:userid', function(req, res, next) {
  ctrlUsers.usersDeleteOne();
});

module.exports = router;
