const shortid = require("shortid");

var User = require("../models/user.model");

module.exports.index = function(req, res) {
  User.find().then(function(users) {
    res.render("users/index", {
      users: users
    });
  })
};

module.exports.info = async function(req, res) {
  var id = req.params.id;
	var userInfo = await MyModel.find({ id: id }).exec();

	res.render('users/info', {
		users: userInfo
	});
};

module.exports.add = async function(req, res) {
  req.body.avatar = req.file.path.split("/").slice(1).join("/");
  await User.create(req.body);
  res.redirect('/users');
};

module.exports.set = function(req, res) {
  db.get('users')
    .find({ id: req.body.id })
    .assign({ name: req.body.name})
    .write()
  res.redirect("/users/info/" + req.body.id);
};

module.exports.remove = function(req, res) {
  db.get('users')
  .remove({ id: req.body.id })
  .write()
  res.redirect("/users");
};