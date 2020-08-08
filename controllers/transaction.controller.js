const shortid = require("shortid");
var Trans = require("../models/transaction.model");
var User = require("../models/user.model");
var Book = require("../models/book.model");

module.exports.index = async function(req, res) {
  var books = await Book.find();
  var users = await User.find();
  var trans = await Trans.find();
  res.render("transaction/index",{
    books: books,
    users: users,
    trans: trans
  })
}

module.exports.info = async function(req, res) {
  var id = req.params.id;

  var transInfo = await Trans.findById({ _id: id });

	res.render('transaction/info', {
		trans: transInfo
	});
};

module.exports.complete = async function(req, res) {
  var errors = [];
  console.log(req.params.id);
  try {
    var transInfo = await Trans.findById(req.params.id);
  } catch {}
  if (transInfo == null) {
    errors.push('Không tìm thấy ID này!');
    res.render('transaction/trangthai', {
		  errors: errors
	  });
  }
  else {
    res.render('transaction/trangthai', {
      trans: transInfo
    });
  }
};

module.exports.add = async function(req, res) {
  await Trans.create(req.body);
  res.redirect('/transaction');
};

module.exports.remove = async function(req, res) {
  await Trans.findByIdAndRemove({_id: req.body.id});
  res.redirect("/transaction");
};

module.exports.postComplete = async function(req, res) {
  Trans.findByIdAndUpdate(req.body.id, {isComplete: "true"}, function() {
    res.redirect("/transaction");
  })
};