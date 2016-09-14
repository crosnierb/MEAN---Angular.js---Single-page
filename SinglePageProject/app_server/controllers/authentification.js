'use strict';
var db = require('../models/db');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.register = function(req, res) {
  console.log("bar");
  var name = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if(name && email && password) {
    db.add_user(name, email, password, function cb(error) {
      if (error) {
        console.log(error);
        return res.status(200).json({
          success: false,
          message: 'This user exist'
        });
      }
      else {
        return res.status(200).json({
          success: true,
          message: "Your account as been created",
          data: {name: name, email: email}
        });
      }
    });
  }
  else {
    return res.status(200).json({
      success: false,
      message: "All fields are required",
      data: {name: name, email: email}
    });
  }
}

exports.login = function(req, res) {
  if(req.body.email && req.body.password){
    db.log_user(req.body.email,req.body.password, function(err, isMatch) {
      if (isMatch) {
        var token = jwt.sign({email: req.body.email}, "cros#nierb@Secret");

        return res.status(200).json({
          success: true
        });
      }
      else {
        return res.status(200).json({
          success: false,
          message: "Incorrect email or password",
          data: {email: req.body.email}
        });
      }
    });
  }
  else if (req.body.email || req.body.password) {
    return res.status(200).json({
      success: "false",
      message: "All fields are required",
      data: {email: ""}
    });
  }
  else {
    return res.status(200).json({
      success: "false",
      data: {email: ""}
    });
  }
}
