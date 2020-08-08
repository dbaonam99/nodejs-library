var Session = require("../models/session.model");
const shortid = require("shortid");

module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });

    await Session.create({sessionId : sessionId});
  }
  var session = await Session.findOne({sessionId:req.signedCookies.sessionId});

  var count = 0;

  if (session) {
    for (let book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.a = count;

  next();
}