import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from "../middleware/upload.js";
import * as productController from "../controller/productController.js";

const router = express.Router();

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

export default router;