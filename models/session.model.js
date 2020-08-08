const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema(
	{
		sessionId: String,
		cart: [{
		    bookId: {
		      type: String,
		      ref: "Book"
		    },
		    quantity: Number
		}]
	},
    {
    	versionKey: false
    }
)
var Session = mongoose.model('Session', sessionSchema, 'session');

module.exports = Session;

