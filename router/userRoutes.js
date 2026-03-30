const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");

router.post("/signup",userController.signUp);
router.post("/login",userController.login);
router.post("/wishlist/add",userController.wishlistAdd);
router.post("/wishlist/remove",userController.wishlistRrmove);

