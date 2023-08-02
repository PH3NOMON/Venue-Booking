const express = require("express");
const router = express.Router();

const connection = require("../datab");

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  res.render("login", { token: token });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const token = req.headers.cookie;

  // Query the database to find the user by email
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email], // Pass the email value as a parameter to prevent SQL injection
    (err, results) => {
      if (err) {
        console.error("Error while querying the database:", err);
        const message = "An error occurred";
        return res.render("home", { message: message });
      }

      if (results.length === 0) {
        const message = "User not found";
        return res.render("home", { message: message });
      }
      const user = results[0];

      if (user.password !== password) {
        const message = "Incorrect password";
        return res.render("home", { message: message });
      }
      console.log();

      const token = user.id;
      res.cookie("token", token, { httpOnly: true });
      const message = "You have successfully logged in!";
      return res.render("home", { token: token, message: message });
    }
  );
});

module.exports = router;
