const express = require("express");
const connection = require("../datab");
const router = express.Router();

router.get("/", (req, res) => {
  const token = req.headers.cookie;
  const message = "";

  res.render("signup", { token: token, message: message });
});

router.post("/", function (req, res) {
  console.log(req.body);
  const { email, password, passwordC } = req.body;
  const token = req.headers.cookie;

  connection.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        console.log("email already exits");
        const message = "Email already exists";
        return res.render("signup", {
          message: message,
          token: token,
        });
      } else if (password !== passwordC) {
        console.log("password didnt match");
        const message = "Passwords do not match";
        return res.render("signup", {
          message: message,
          token: token,
        });
      }

      connection.query(
        "INSERT INTO users SET ? ",
        {
          email: email,
          password: password,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log("User Registered");
            const message = "User Registered, Please proceed with login.";
            return res.render("signup", {
              message: message,
              token: token,
            });
          }
        }
      );
    }
  );
});

module.exports = router;
