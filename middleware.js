const Listing = require("./models/listing");
const Review = require("./models/review");        // ✅ Yeh add kiya
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

// ================= AUTHENTICATION =================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login required!");
    return res.redirect("/login");
  }
  next();
};

// ================= AUTHORIZATION =================
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "Not allowed!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ================= VALIDATE LISTING =================
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// ================= VALIDATE REVIEW =================
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ================= IS REVIEW AUTHOR =================
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);  // ✅ Review capital mein

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);      // ✅ /listing → /listings
  }
  next();
};