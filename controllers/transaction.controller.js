const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = function(req, res) {
  res.render("transaction/index", {
    books: db.get("books").value(),
    users: db.get("users").value(),
    trans: db.get("trans").value(),
  });
};

module.exports.info = function(req, res) {
  var id = req.params.id;
	var transInfo = db.get('trans').find({id: id}).value();

	res.render('transaction/info', {
		trans: transInfo
	});
};

module.exports.complete = function(req, res) {
  var inputID = req.params.id;
	var transInfo = db.get('trans').find({id: inputID}).value();
  var oldTransInfo = db.get('trans').value();
  var errors = [];
  if (transInfo == null) {
    errors.push('Không tìm thấy ID này!');
    res.render('transaction/trangthai', {
		  errors: errors
	  });
  } 
  else {
    res.render('transaction/trangthai', {
      trans: oldTransInfo
    });
  }
};

module.exports.add = function(req, res) {
  req.body.id = shortid.generate();
  db.get("trans").push(req.body).write();
  res.redirect('/transaction');
};

module.exports.remove = function(req, res) {
  db.get('trans')
  .remove({ id: req.body.id })
  .write()
  res.redirect("/transaction");
};

module.exports.postComplete = function(req, res) {
  db.get('trans')
    .find({ id: req.body.id })
    .assign({ isComplete: "true"})
    .write()
  res.redirect("/transaction");
};