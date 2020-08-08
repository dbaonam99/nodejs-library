const mongoose = require('mongoose');

var transSchema = new mongoose.Schema({
	bookID: String,
    userID: String,
    isComplete: Boolean
	},
    {
    	versionKey: false
    }
)

var Trans = mongoose.model('Trans', transSchema, 'trans');

module.exports = Trans;