const express = require("express");
const router = express.Router();
const connection = require("../datab");
router.get("/", (req, res) => {
  res.render("admin");
});

router.get("/admin", (req, res) => {
  // Define the SQL query to retrieve the booked venues
  const selectQuery = `SELECT * FROM timetable`;

  // Use the connection connection to execute the query
  connection.query(selectQuery, (err, rows) => {
    if (err) {
      return res.send("Error occurred while fetching data.");
    }
    res.render("admin", { timetable: rows });
  });
});

// Handle form submission and store data in the database with redundancy check
router.post("/submit", (req, res) => {
  // ...
  // SQL query to insert the data into the database, with INSERT IGNORE
  // ...
});

// Update booking by ID
router.get("/update/:id", (req, res) => {
  const id = req.params.id;
  // Fetch booking details from the database by ID
  const selectQuery = `SELECT * FROM timetable WHERE id = ?`;
  connection.query(selectQuery, [id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.send("Booking not found.");
    }
    res.render("update", { booking: rows[0] });
  });
});

// Handle form submission for updating booking
router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { venue, Start_time, End_time, venue_location, venue_type } = req.body;

  // Define the SQL query to update the booking in the database
  const updateQuery = `
    UPDATE timetable
    SET venue = ?, Start_time = ?, End_time = ?, venue_location =venue_ ?, type = ?
    WHERE id = ?
  `;

  // Use the connection connection to execute the query
  connection.query(
    updateQuery,
    [venue, Start_time, End_time, venue_location, venue_type, id],
    (err, result) => {
      if (err) {
        return res.send("Error occurred while updating the booking.");
      }
      res.redirect("/admin");
    }
  );
});

// Delete booking by ID
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  // Define the SQL query to delete the booking from the database
  const deleteQuery = `DELETE FROM timetable WHERE id = ?`;

  // Use the connection connection to execute the query
  connection.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.send("Error occurred while deleting the booking.");
    }
    res.redirect("/admin");
  });
});

module.exports = router;
