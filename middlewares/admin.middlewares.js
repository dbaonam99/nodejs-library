// var db = require("../db.js");
var User = require("../models/user.model");

module.exports.admin = async function(req, res, next) {
  var adminRole = [];
  var userRole = [];
  var role = await User.find({_id: req.signedCookies.userId, isAdmin: "true"});

  if (role.length == 0) {
    userRole.push("user");
  } else {
    adminRole.push("admin");
  }

  try {
    var user = await User.findById({  _id:req.signedCookies.userId });
  } catch {}
 
  res.locals.user = user;

  res.locals.adminRole = adminRole;
  res.locals.userRole = userRole;

  // console.log(res.locals.adminRole.length);
  // console.log(res.locals.userRole.length);
  next();
}