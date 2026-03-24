require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("./config/mongoose-connection");

const productRoutes = require("./router/productRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", productRoutes);

app.listen(3000, () => {
  console.log("Backend API running on http://localhost:3000");
});