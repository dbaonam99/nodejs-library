const express = require("express");
const router = express.Router();

var controller = require("../controllers/cart.controller");

router.get("/add/:productId", controller.addToCart);

module.exports = router;