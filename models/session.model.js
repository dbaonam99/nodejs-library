const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema(
	{
		sessionId: String,
		cart: String
	},
    {
    	versionKey: false
    }
)

var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;