const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
    age:String,
    email: String,
    password: String,
    isAdmin: Boolean,
    avatar: String
})

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;