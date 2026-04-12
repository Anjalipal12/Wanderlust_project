const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// ✅ Import middleware correctly
const { isLoggedIn, validateReview } = require("../middleware.js");

// ================= ADD REVIEW =================
// ================= ADD REVIEW =================
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    const review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);

    await review.save();
    await listing.save({ validateBeforeSave: false }); // ✅ Yeh fix karo

    req.flash("success", "Review added successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// ================= DELETE REVIEW =================
router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;