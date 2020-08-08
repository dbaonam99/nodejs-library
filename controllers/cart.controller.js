var Session = require("../models/session.model");

module.exports.addToCart = function(req, res, next) {
  var bookId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect('/books');
    return;
  }

  // console.log(bookId);
  
  // var count = db.get("sessions")
  //   .find({id: sessionId})
  //   .get('cart.' + bookId, 0)
  //   .value();
  
  // var totalCount = count + 1;

  // db.get('sessions')
  //   .find({ id : sessionId })
  //   .set('cart.' + bookId, totalCount)
  //   .write();

  // var cart = {
  //   bookId: 1
  // }
  
  // console.log(sessionId);
  // Session.find({sessionId: sessionId}, function(err, res) {
  //   console.log(res);
  // })

  // var cart = {
  //   bookId: 1
  // }
  // console.log(cart);

  // Session.find({sessionId: sessionId}, function(err, res) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(res);
  // }); 
  
  Session.findByIdAndUpdate({sessionId: sessionId}, { cart : "Zxc" }, function(err, res) {
    if(err) console.log(err);
    console.log(res);
  });

  // Session.findById(req.signedCookies.sessionId).then(function(err, res) {
  //   console.log(res);
  // });
  
  // var cart = db.get('sessions[0].cart').value();
  
  // var totalItem = 0;
  // for (var item in cart) {
  //   totalItem = totalItem + cart[item];
  // }
  
  // res.locals.a = totalItem;
  
  res.redirect('/books');
}