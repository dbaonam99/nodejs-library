var db = require("../db")

module.exports.addToCart = function(req, res, next) {
  var bookId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect('/books');
    return;
  }
  
  var count = db.get("sessions")
    .find({id: sessionId})
    .get('cart.' + bookId, 0)
    .value();
  
  var totalCount = count + 1;
  db.get('sessions')
    .find({ id : sessionId })
    .set('cart.' + bookId, totalCount)
    .write();
  
  var cart = db.get('sessions[0].cart').value();
  
  var totalItem = 0;
  for (var item in cart) {
    totalItem = totalItem + cart[item];
  }
  console.log(totalItem);
  
  res.locals.a = totalItem;
  
  res.redirect('/books');
}