const express = require("express");
const router = express.Router();

const connection = require("../datab");

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  const message = "";

  res.render("book", { token: token, message: message });
});

router.post("/", function (req, res) {
  console.log(req.body);
  const { Start_time, venue, End_time, venue_location, venue_type } = req.body;
  const token = req.headers.cookie;
  const user_id = token.split("=")[1];

  if (!token) {
    const message = "Error: User authentication failed.";
    return res.render("book", {
      message: message,
    });
  }

  // const formattedStartTime = formatDate(Start_time);
  // const formattedEndTime = formatDate(End_time);

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
      Start_time,
      End_time,
      venue_location,
      venue_type,
      user_id,
      venue,
      Start_time,
      End_time,
      venue_location,
      venue_type,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        const message = "Error occurred while saving the data.";
        return res.render("book", {
          message: message,
          token: token,
        });
      }

      if (result.affectedRows === 0) {
        const message = " The booking already exists.";
        return res.render("book", {
          message: message,
          token: token,
        });
      }

      const message = "Data saved successfully!";
      return res.render("book", {
        message: message,
        token: token,
      });
    }
  );
});

// function formatDate(dateTimeStr) {
//   const date = new Date(dateTimeStr);
//   return date.toISOString().slice(0, 19).replace("T", " ");
// }
module.exports = router;
