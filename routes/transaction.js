const express = require("express");
const router = express.Router();
var controller = require("../controllers/transaction.controller");

router.get("/", controller.index);

router.get("/info/:id", controller.info);

router.get("/:id/complete" , controller.complete);

router.post("/add", controller.add);

router.post("/remove", controller.remove);

router.post("/complete", controller.postComplete);



module.exports = router;