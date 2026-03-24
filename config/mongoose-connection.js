const mongoose = require("mongoose");
const config = require("config");

let dbURI;

  dbURI = process.env.MONGODB_URI;


mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

module.exports = mongoose.connection;