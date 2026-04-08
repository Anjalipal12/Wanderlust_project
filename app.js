// ====================== 1. Imports ======================
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

// ====================== 2. Routers ======================
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

// ====================== 3. DB connection + Server start ======================
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL); // <--- remove options
    console.log("✅ Connected to MongoDB");

    app.listen(8080, () => {
      console.log("🚀 Server running on http://localhost:8080");
    });
  } catch (err) {
    console.log("❌ MongoDB Connection Error:");
    console.log(err);
    process.exit(1);
  }
}

startServer();

// ====================== 4. View engine ======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====================== 5. Middleware ======================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ===== Session + Flash =====
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionOptions));
app.use(flash());

// ===== Flash messages & current user locals =====
app.use((req, res, next) => {
  res.locals.currUser = req.user || null; // optional if auth system exists
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ====================== 6. Routes ======================
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// ====================== 7. 404 Handler ======================
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// ====================== 8. Error Handler ======================
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});