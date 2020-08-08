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
	User.findById({ _id: id }).then(function(users) {
    res.render('users/info', {
      users: users
    });
  });
};

module.exports.add = async function(req, res) {
  var errors = [];
  if(!req.body.name || !req.body.age || !req.body.email || !req.body.password) {
    errors.push("Hãy điền đầy đủ thông tin!")
  }
  console.log(errors);
  if(errors.length) {
    User.find().then(function(users) {
      res.render("users/index", {
        users: users,
        errors: errors
      });
    })
    return;
  }
  req.body.avatar = req.file.path.split("/").slice(1).join("/");
  console.log(req.body);
  await User.create(req.body, function(err, res) {
    console.log(res);
  });
  res.redirect('/users');
};

module.exports.set = function(req, res) {
  User.findByIdAndUpdate(req.body.id, {name : req.body.name}, function() {
    res.redirect("/users/info/" + req.body.id);
  })
};

module.exports.remove = function(req, res) {
  User.findByIdAndRemove(req.body.id, function() {
    res.redirect("/users");
  })
};