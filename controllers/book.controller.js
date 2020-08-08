const shortid = require("shortid");
var Book = require("../models/book.model");

module.exports.index = function(req, res) {
  // var page = req.query.page || 1;
  // var perPage = 8;
  
  // var start = (page -1) * perPage;
  // var end = page * perPage;

  Book.find().limit(8).then(function(books) {
    res.render("books/index", {
      books: books
    });
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
  res.redirect('/books');
};

module.exports.set = function(req, res) {
  Book.findByIdAndUpdate(req.body.id, {title : req.body.title}, function() {
    res.redirect("/books/info/" + req.body.id);
  })
};

module.exports.remove = function(req, res) {
  Book.findByIdAndRemove(req.body.id, function() {
    res.redirect("/books");
  })
};