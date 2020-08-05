const express = require("express");
const router = express.Router();

var controller = require("../controllers/book.controller");

router.get("/", controller.index);

router.get("/info/:id", controller.info);


router.post("/add", controller.add);

router.post("/set", controller.set);

router.post("/remove", controller.remove);

module.exports = router;