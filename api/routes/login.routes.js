const express = require("express");
const router = express.Router();

var controller = require("../controllers/login.controllers");

router.get("/", controller.index);
// router.post("/", controller.postLogin);

module.exports = router;