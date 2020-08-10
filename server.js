const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

var Book = require("./models/book.model");
var User = require("./models/user.model");

mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var bookRoutes = require('./routes/book');
var userRoutes = require('./routes/user');
var transRoutes = require('./routes/transaction');
var loginRoutes = require('./routes/login');
var cartRoutes = require('./routes/cart');
var shopRoutes = require('./routes/shop');

var loginMiddle = require('./middlewares/login.middlewares');
var adminMiddle = require('./middlewares/admin.middlewares');
var sessionMiddle = require('./middlewares/session.middlewares');
var cartMiddle = require('./middlewares/cart.middlewares');

var apiBookRoutes = require('./api/routes/book.routes');
var apiTransactionRoutes = require('./api/routes/transaction.routes');
var apiLoginRoutes = require('./api/routes/login.routes');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(cookieParser('zxczxcz'));
app.use(sessionMiddle);

app.use("/api/books", apiBookRoutes);
app.use("/api/transaction", apiTransactionRoutes);
app.use("/api/login", apiLoginRoutes);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", adminMiddle.admin, async function(req, res) {
	var page = req.query.page || 1;
	Book.find().limit(8).skip(8*(page-1)).then(function(books) {
	  	res.render("index", {
	    	books: books
	  	});
	})
});
app.get("/search", adminMiddle.admin, async function(req, res) {
	var q = req.query.q;

	var books = await Book.find();

	var result = books.filter(function(book) {
	    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	})
	
	res.render('index', {
	    books : result
	})
});

app.use("/books", loginMiddle.requireAuth, adminMiddle.admin, cartMiddle, bookRoutes);
app.use("/users", loginMiddle.requireAuth, adminMiddle.admin, userRoutes);
app.use("/transaction", loginMiddle.requireAuth, adminMiddle.admin, transRoutes);
app.use("/login", loginRoutes);
app.use("/cart", cartRoutes);
app.use("/shop", adminMiddle.admin, shopRoutes);

const listener = app.listen(3000, () => {
  	console.log("Your app is listening on port " + 3000);
});
