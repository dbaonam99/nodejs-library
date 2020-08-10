var Session = require("../models/session.model");

module.exports.addToCart = async function(req, res, next) {
  var bookId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {
    res.redirect('/books');
    return;
  }

  var session = await Session.findOne({sessionId : sessionId});

  // var book = session.cart.find(book => book.bookId = bookId);

  let book = session.cart.find(
    cartItem => cartItem.bookId === bookId
  );

  if(!book) {
    Session.findOneAndUpdate({sessionId: sessionId}, { $push: {cart : { bookId, quantity: 1} }}, function(err, res) {
      if(err) console.log(err);
      console.log(res);
    });
  } else {
    book.quantity += 1;
    session.save();
  }
  
  res.redirect('/');
}