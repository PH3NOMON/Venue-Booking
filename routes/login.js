const express = require("express");
const router = express.Router();

const connection = require("../datab");

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  const message = "";
  res.render("login", { token: token, message: message });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const token = req.headers.cookie;

  // Query the database to find the user by email
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email], // Pass the email value as a parameter to prevent SQL injection
    (err, results, rows) => {
      if (err) {
        console.error("Error while querying the database:", err);
        const message = "An error occurred";
        const token = null;
        return res.render("login", { token: token, message: message });
      }

      if (results.length === 0) {
        const message = "User not found";
        const token = null;
        return res.render("login", { token: token, message: message });
      }
      const user = results[0];

      if (email === "admin@gmail.com" && user.password === "admin") {
        const token = req.headers.cookie;
        const message = "Admin login successful!";

        return res.redirect("admin");
      }

      if (user.password !== password) {
        const message = "Incorrect password";
        const token = null;
        return res.render("login", { token: token, message: message });
      }

      const token = user.id;
      res.cookie("token", token, { httpOnly: true });
      const message = "You have successfully logged in!";
      return res.render("login", { token: token, message: message });
    }
  );
});

module.exports = router;
