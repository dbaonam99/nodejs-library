const shortid = require("shortid");
var db = require("../db.js");

module.exports.index = function(req, res) {
  var page = req.query.page || 1;
  var perPage = 8;
  
  var start = (page -1) * perPage;
  var end = page * perPage;
  res.render("books/index", {
    books: db.get("books").value().slice(start, end)
  });
};


module.exports.info = function(req, res) {
  var id = req.params.id;
	var bookInfo = db.get('books').find({id: id}).value();

	res.render('books/info', {
		books: bookInfo
	});
};

module.exports.add = function(req, res) {
  req.body.id = shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect('/books');
};

module.exports.set = function(req, res) {
  db.get('books')
    .find({ id: req.body.id })
    .assign({ title: req.body.title})
    .write()
  res.redirect("/books/info/" + req.body.id);
};

module.exports.remove = function(req, res) {
  db.get('books')
  .remove({ id: req.body.id })
  .write()
  res.redirect("/books");
};