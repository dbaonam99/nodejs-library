var Trans = require("../../models/transaction.model");

module.exports.index = async function(req, res) {
	var trans = await Trans.find();
	res.json(trans);
};