const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const productController = require("../controller/productController");

router.get("/", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.post(
  "/products",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  productController.createProduct
);

module.exports = router;