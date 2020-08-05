var db = require("../db.js");

module.exports = function(req, res, next) {
  var cart = db.get('sessions[0].cart').value();
  
  var totalItem = 0;
  for (var item in cart) {
    totalItem = totalItem + cart[item];
  }
  console.log(totalItem);
  
  res.locals.a = totalItem;
  
  next();
}