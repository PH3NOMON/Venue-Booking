const express = require("express");
const router = express.Router();

const connection = require("../datab");

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  const user_id = token.split("=")[1];

  if (!token) {
    return res.send("Error: User authentication failed.");
  }

  // Define the SQL query to fetch the booked details for the logged-in user
  const selectQuery = `
    SELECT venue, Start_time, End_time, venue_location, venue_type
    FROM timetable
    WHERE user_id = ?
  `;

  // Use the connection connection to execute the query
  connection.query(selectQuery, [user_id], (err, rows) => {
    if (err) {
      return res.send("Error occurred while fetching data.");
    }

    res.render("venue", { timetable: rows, token: token });
  });
});

module.exports = router;
