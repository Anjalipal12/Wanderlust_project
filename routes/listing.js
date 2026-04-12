const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require("../controllers/listings.js");
// ================= INDEX =================
router.get("/", wrapAsync(listingController.index)
);

// ================= NEW =================
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ================= CREATE =================
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

// ================= SHOW =================
router.get("/:id", wrapAsync(listingController.showListing));
// ================= EDIT =================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
  })
);

// ================= UPDATE =================
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, req.body.listing, {
      new: true,
      runValidators: true,
    });

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  })
);

// ================= DELETE =================
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
  })
);

module.exports.createListing = router;