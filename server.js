const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");

var app = express();

// const port = process.env.PORT;
// view engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static("public"));

const homePage = require("./routes/home");
const aboutPage = require("./routes/about");
const venuePage = require("./routes/venue");
const signupPage = require("./routes/signup");
const loginPage = require("./routes/login");
const logoutPage = require("./routes/logout");
const adminPage = require("./routes/admin");

app.use("/", homePage);
app.use("/about", aboutPage);
app.use("/venue", venuePage);
app.use("/signup", signupPage);
app.use("/login", loginPage);
app.use("/logout", logoutPage);
app.use("/admin", adminPage);

//set app port
app.listen(3000, () => {
  console.log(`Serving on port 3000`);
});
