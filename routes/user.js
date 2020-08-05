const express = require("express");
var multer  = require('multer')

const router = express.Router();
var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");
var upload = multer({ dest: './public/uploads/' })

router.get("/", controller.index);

router.get("/info/:id", controller.info);

router.post("/add", upload.single('avatar'), /*validate.postAdd,*/ controller.add);

router.post("/set", controller.set);

router.post("/remove", controller.remove);

module.exports = router;