var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.render("token", { title: "Token user" ,username:req.cookies['username']});
  });
  module.exports = router;