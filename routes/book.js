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
  const {
    Start_time,
    venue,
    End_time,

    venue_type,
    Phone,
    Status,
  } = req.body;
  const token = req.headers.cookie;
  const user_id = token.split("=")[1];

  if (!token) {
    const message = "Error: User authentication failed.";
    return res.render("book", {
      message: message,
    });
  }

  // Check if the requested time slot is already booked
  const checkQuery = `
  SELECT 1
  FROM timetable
  WHERE venue = ? AND Start_time = ? AND End_time = ?
  LIMIT 1
`;

  connection.query(
    checkQuery,
    [venue, Start_time, End_time],
    (checkErr, checkResult) => {
      if (checkErr) {
        console.log(checkErr);

        const message = "Error occurred while checking availability.";
        return res.render("book", {
          message: message,
          token: token,
        });
      }

      if (checkResult.length > 0) {
        const message = "The requested time slot is already booked.";
        return res.render("book", {
          message: message,
          token: token,
        });
      }

      // If the time slot is available, insert the booking
      const insertQuery = `
      INSERT INTO timetable (venue, Start_time, End_time, Phone, venue_type, user_id, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      connection.query(
        insertQuery,
        [venue, Start_time, End_time, Phone, venue_type, user_id, "Pending"],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.log(insertErr);

            const message = "Error occurred while saving the data.";
            return res.render("book", {
              message: message,
              token: token,
            });
          }

          console.log(insertResult);

          const message =
            "Booking Data saved successfully! Please Check your Phone for Payment Details!";
          return res.render("book", {
            message: message,
            token: token,
          });
        }
      );
    }
  );
});

module.exports = router;
