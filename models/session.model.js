const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
	id: String
	},
    {
    	versionKey: false
    }
)

var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;