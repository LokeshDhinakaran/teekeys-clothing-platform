const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const productController = require("../controller/productController");

// 🔥 GET
router.get("/", productController.getAllProducts);

// 🔥 GET BY ID
router.get("/products/:id", productController.getProductById);

// 🔥 POST
router.post(
  "/products",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  productController.createProduct
);

module.exports = router;