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
  const user_id = token.split("=")[1];

  if (!token) {
    return res.send("Error: User authentication failed.");
  }

  const formattedStartTime = formatDate(Start_time);
  const formattedEndTime = formatDate(End_time);

  const insertQuery = `
    INSERT INTO timetable (venue, Start_time, End_time, venue_location, venue_type, user_id)
    SELECT ?, ?, ?, ?, ?, ?
     FROM DUAL
    WHERE NOT EXISTS (
      SELECT 1
      FROM timetable
      WHERE venue = ? AND Start_time = ? AND End_time = ? AND venue_location = ? AND venue_type = ? AND user_id = ?
    )
    LIMIT 1
  `;
  connection.query(
    insertQuery,
    [
      venue,
      formattedStartTime,
      formattedEndTime,
      venue_location,
      venue_type,
      user_id,
      venue,
      formattedStartTime,
      formattedEndTime,
      venue_location,
      venue_type,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error occurred while saving the data.");
      }

      if (result.affectedRows === 0) {
        return res.send("Error: The booking already exists.");
      }

      res.send("Data saved successfully!");
    }
  );
});

function formatDate(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.toISOString().slice(0, 19).replace("T", " ");
}
module.exports = router;
