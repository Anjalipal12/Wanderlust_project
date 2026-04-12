const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Create a demo user
  const demoUser = new User({
    email: "demo@gmail.com",
    username: "demoUser",
  });

  const registeredUser = await User.register(demoUser, "password123");

  // Assign owner to each listing
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: registeredUser._id,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("Database initialized with sample data!");
};

main()
  .then(initDB)
  .then(() => {
    mongoose.connection.close();
    console.log("Database connection closed.");
  })
  .catch((err) => {
    console.log(err);
  });