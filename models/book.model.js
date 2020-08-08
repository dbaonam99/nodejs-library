const mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	title: String,
	des: String
	},
    {
    	versionKey: false
    }
)

var Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;