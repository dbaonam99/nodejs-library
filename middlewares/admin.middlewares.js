// var db = require("../db.js");

module.exports.admin = function(req, res, next) {
  var user = db.get('users').find({id : req.signedCookies.userId, isAdmin: "true"}).value();
  
  if (!user) {
    res.send('user')
    return;
  } 
  
  if (user) {
    res.send('admin')
    return;
  }
  
  next();
}