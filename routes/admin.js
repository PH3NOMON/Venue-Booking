const express = require("express");
const router = express.Router();
const connection = require("../datab");

router.get("/", (req, res) => {
  // Define the SQL query to retrieve the booked venues
  const selectQuery = `SELECT * FROM timetable`;

  // Use the connection connection to execute the query
  connection.query(selectQuery, (err, rows) => {
    if (err) {
      return res.send("Error occurred while fetching data.");
    }
    res.render("admin", { token: null, timetable: rows });
  });
});

router.get("/admin", (req, res) => {
  // Define the SQL query to retrieve the booked venues
  const selectQuery = `SELECT * FROM timetable`;

  // Use the connection connection to execute the query
  connection.query(selectQuery, (err, rows) => {
    if (err) {
      return res.send("Error occurred while fetching data.");
    }
    res.render("admin", { token: null, timetable: rows });
  });
});

// Delete booking by ID
router.get("/delete/:id", (req, res) => {
  const bid = req.params.id;

  // Define the SQL query to delete the booking from the database
  const deleteQuery = `DELETE FROM timetable WHERE id = ?`;

  // Use the connection connection to execute the query
  connection.query(deleteQuery, [bid], (err, result) => {
    if (err) {
      return res.send("Error occurred while deleting the booking.", {
        token: token,
      });
    }
    res.redirect("/admin");
  });
});

module.exports = router;
