const shortid = require("shortid");
var Book = require("../models/book.model");
var User = require("../models/user.model");

module.exports.index = async function(req, res) {
  var userId = req.signedCookies.userId;

  var books = await Book.find({userId: userId});
  var users = await User.find();
  res.render("books/index",{
    books: books,
    users: users
  })
};

module.exports.info = function(req, res) {
  var id = req.params.id;
  Book.findById({ _id: id }).then(function(books) {
    res.render('books/info', {
      books: books
    });
  });
};

module.exports.add = async function(req, res) {
  await Book.create(req.body);
  console.log(req.body);
  res.redirect('/books/' + req.signedCookies.userId);
};

module.exports.set = function(req, res) {
  Book.findByIdAndUpdate(req.body.id, {title : req.body.title}, function() {
    res.redirect("/books/info/" + req.body.id);
  })
};

module.exports.remove = function(req, res) {
  Book.findByIdAndRemove(req.body.id, function() {
    res.redirect('/books/' + req.signedCookies.userId);
  })
};