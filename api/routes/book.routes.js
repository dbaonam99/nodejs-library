const express = require("express");
const router = express.Router();

var controller = require("../controllers/book.controllers");

router.get("/", controller.index);

module.exports = router;