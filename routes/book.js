const express = require("express");
const router = express.Router();

const connection = require("../datab");

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  res.render("book", { token: token });
});

router.post("/", function (req, res) {
  console.log(req.body);
  const { Start_time, venue, End_time, venue_location, venue_type } = req.body;
  const token = req.headers.cookie;
  const insertQuery = `
    INSERT IGNORE INTO bookings (venue, Start_time, End_time, venue_location, venue_type)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [venue, Start_time, End_time, venue_location, venue_type],
    (err, result) => {
      if (err) {
        return res.send("Error occurred while saving the data.");
      }
      if (result.affectedRows === 0) {
        return res.send("Duplicate entry! The booking already exists.");
      }

      res.send("Data saved successfully!");
    }
  );
});

module.exports = router;
