import mongoose from "mongoose";
import config from "config";

let dbURI;

  dbURI = process.env.MONGODB_URI;


mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.log("❌ DB Connection Error:", err);
  });

export default mongoose.connection;