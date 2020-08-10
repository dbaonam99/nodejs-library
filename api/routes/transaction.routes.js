const express = require("express");
const router = express.Router();

var controller = require("../controllers/transaction.controllers");

router.get("/", controller.index);

module.exports = router;