const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchems } = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Database Connection
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// HOME
app.get("/", (req, res) => {
  res.redirect("/listings");
});

const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, result.errMsg);
  }else{
    next();
  }
};

// INDEX
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
}));

// NEW
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// SHOW (🔥 FIXED)
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;

  // invalid id check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid ID");
  }

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found!");
  }

  res.render("listings/show", { listing });
}));

// CREATE ROUTE
app.post(
  "/listings", validateListing,
  wrapAsync(async (req, res, next) => {

    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid data for listing");
    }
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error) {
      throw new ExpressError(400, result.error);
    }
    const newListing = new Listing(req.body.listing);
    if(!newListing.description){
      throw new ExpressError(400, "Description is missing!");
    }
    if(!newListing.location){
      throw new ExpressError(400, "location is missing!");
    }
    await newListing.save();

    res.redirect("/listings");
  })
);

// EDIT
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found!");
  }

  res.render("listings/edit", { listing });
}));

// UPDATE Route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;

  if (!req.body.listing) {
    throw new ExpressError(400, "Send valid data for listing");
  }

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listings/${id}`);
}));

// DELETE
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// 404 ROUTE
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});

// SERVER
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});