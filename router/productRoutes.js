const express = require("express");
const router = express.Router();
const authMiddleware= require('../middleware/authMiddleware.js')
const adminMiddleware = require('../middleware/adminMiddleware.js')
const upload = require("../middleware/upload");
const productController = require("../controller/productController");

router.get("/products", productController.getAllProducts);

router.get("/products/:id", productController.getProductById);

router.post(
  "/admin/products/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);

router.put("/admin/products/edit/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
)

router.delete("/admin/products/delete/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
)


router.get("/categories", productController.getCategories)

router.get("/categories/:category", productController.getByCategory)

router.get("/search", productController.searchProducts);
module.exports = router;