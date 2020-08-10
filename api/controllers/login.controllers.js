var User = require("../../models/user.model");

module.exports.index = async function(req, res) {
	var users = await User.find();
	res.json(users);
};
module.exports.postLogin = async function(req, res) {
	
	console.log("Z");
};