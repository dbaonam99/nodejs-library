const express = require("express");
const router = express.Router();

var controller = require("../controllers/shop.controller");

router.get("/:userId/books", controller.index);

module.exports = router;