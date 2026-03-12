const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description provided",
  },

  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60",
    },
  },

  price: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  country: {
    type: String,
    default: "Unknown",
  },
});

// Optional: helper method to get image URL quickly
listingSchema.methods.getImageUrl = function () {
  return this.image.url || this.image.default;
};

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;