var Book = require("../models/book.model");
var User = require("../models/user.model");

module.exports.index = async function(req, res) {
  var userId = req.params.userId;

  var books = await Book.find({userId: userId});
  var users = await User.find();
  res.render("shop/index",{
    books: books,
    users: users
  })
}