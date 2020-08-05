const shortid = require("shortid");
var db = require("../db.js");

module.exports.postAdd = function(req, res, next) {
  var errors = [];
  if (req.body.name.length > 10) {
    errors.push('Không được nhập quá 10 ký tự');
  }
  if (req.body.name == "") {
    errors.push("Không được điền trống");
  }
  res.render('users/index', {
    errors: errors,
    users: db.get("users").value()
  })
  return;
  next();
}