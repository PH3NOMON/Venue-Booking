const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin");
});

router.get("/admin", (req, res) => {
  // Define the SQL query to retrieve the booked venues
  const selectQuery = `SELECT * FROM bookings`;

  // Use the connection pool to execute the query
  pool.query(selectQuery, (err, rows) => {
    if (err) {
      return res.send("Error occurred while fetching data.");
    }
    res.render("admin", { bookings: rows });
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
  const bookingId = req.params.id;
  // Fetch booking details from the database by ID
  const selectQuery = `SELECT * FROM bookings WHERE id = ?`;
  pool.query(selectQuery, [bookingId], (err, rows) => {
    if (err || rows.length === 0) {
      return res.send("Booking not found.");
    }
    res.render("update", { booking: rows[0] });
  });
});

// Handle form submission for updating booking
router.post("/update/:id", (req, res) => {
  const bookingId = req.params.id;
  const { venue, start_time, end_time, location, type } = req.body;

  // Define the SQL query to update the booking in the database
  const updateQuery = `
    UPDATE bookings
    SET venue = ?, start_time = ?, end_time = ?, location = ?, type = ?
    WHERE id = ?
  `;

  // Use the connection pool to execute the query
  pool.query(
    updateQuery,
    [venue, start_time, end_time, location, type, bookingId],
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
  const bookingId = req.params.id;

  // Define the SQL query to delete the booking from the database
  const deleteQuery = `DELETE FROM bookings WHERE id = ?`;

  // Use the connection pool to execute the query
  pool.query(deleteQuery, [bookingId], (err, result) => {
    if (err) {
      return res.send("Error occurred while deleting the booking.");
    }
    res.redirect("/admin");
  });
});

module.exports = router;
