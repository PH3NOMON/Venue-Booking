const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  res.render("venue", { token: token });
});

router.get("/venue", function (req, res) {
  connection.query(
    "SELECT * from timetable",
    function (error, results, fields) {
      if (error) console.log(error);
      res.render("/venue", { timetable: results });
    }
  );
});

router.post("/venue", function (req, res) {
  var available_time = req.body.available_time;
  var venue_type = req.body.venue_type;
  var venue_location = req.body.venue_location;

  connection.query(
    "insert into timetable(venue_type,venue_location,available_time) values(?,?,?) ",
    [venue_type, venue_location, available_time],
    function (error, results, fields) {
      if (error) console.log(error);
      res.redirect("/venue");
    }
  );
});

module.exports = router;
