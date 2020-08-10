const express = require("express");
const router = express.Router();
var controller = require("../controllers/login.controller");

router.get("/", controller.index);
router.get("/register", controller.registerIndex);
router.get("/logout", controller.logout);

router.post("/", controller.postLogin);
router.post("/add", controller.addNewAccount);
module.exports = router;