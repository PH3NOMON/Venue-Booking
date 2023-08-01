const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  res.redirect("/");
});

module.exports = router;
