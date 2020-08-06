var Session = require("../models/session.model");
const shortid = require("shortid");

module.exports = async function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    await Session.create(req.signedCookies.sessionId);
  }

  next();
}