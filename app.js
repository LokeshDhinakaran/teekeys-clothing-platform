import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import "./config/mongoose-connection.js";
import userRoutes from "./router/userRoutes.js";
import productRoutes from "./router/productRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", productRoutes);

app.use("/users",userRoutes)


app.listen(3000, () => {
  console.log("Backend API running on http://localhost:3000");
});