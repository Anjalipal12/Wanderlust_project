const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res) => {
  let { username, email, password } = req.body;

  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);

  req.login(registeredUser, err => {
    if (err) return next(err);
    req.flash("success", "Welcome!");
    res.redirect("/listings");
  });
}));

// LOGIN
router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  }
);

// LOGOUT
router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.flash("success", "Logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;