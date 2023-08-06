const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  res.render("home", {
    token: token,
  });
});

module.exports = router;
