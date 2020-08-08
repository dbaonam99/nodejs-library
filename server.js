const express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var bookRoutes = require('./routes/book');
var userRoutes = require('./routes/user');
var transRoutes = require('./routes/transaction');
var loginRoutes = require('./routes/login');
var cartRoutes = require('./routes/cart');

var loginMiddle = require('./middlewares/login.middlewares');
var adminMiddle = require('./middlewares/admin.middlewares');
var sessionMiddle = require('./middlewares/session.middlewares');
var cartMiddle = require('./middlewares/cart.middlewares');

var apiBookRoutes = require('./api/routes/book.routes');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(cookieParser('zxczxcz'));
app.use(sessionMiddle);

app.use("/api/books", apiBookRoutes);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", loginMiddle.requireAuth, function(req, res) {
  res.render("index");
});

app.use("/books", cartMiddle, bookRoutes);
app.use("/users", loginMiddle.requireAuth, /*adminMiddle.admin,*/  userRoutes);
app.use("/transaction", loginMiddle.requireAuth, /*adminMiddle.admin,*/  transRoutes);
app.use("/login", loginRoutes);
app.use("/cart", cartRoutes);

const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + 3000);
});
