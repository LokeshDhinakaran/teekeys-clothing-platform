import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/signup",userController.signUp);
router.post("/login",userController.login);
router.get("/wishlist",authMiddleware,userController.getWishlist);
router.post("/wishlist/add",authMiddleware,userController.wishlistAdd);
router.post("/wishlist/remove",authMiddleware,userController.wishlistRemove);

export default router;