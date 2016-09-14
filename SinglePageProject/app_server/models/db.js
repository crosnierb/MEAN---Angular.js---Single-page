
var users = require('./users');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/src');
var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('database is connected.');
});

exports.add_user = function(name, email, password, cb) {
 new users({name: name, email: email, password: password}).save(function(err){
   if (err)
    cb(err);
   else
    cb(false);
 });
}

exports.log_user = function(email, password, cb) {
users.findOne({'email':email}, function(err, user) {
  if (err || !user) {
    if(!user){
      console.log("User doesn't exist");
      return cb(true);
    }
    return cb(err);
  }
  user.comparePassword(password, cb);
});
}
