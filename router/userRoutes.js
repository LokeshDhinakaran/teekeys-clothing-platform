const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const userController = require("../controller/userController.js");

router.post("/signup",userController.signUp);
router.post("/login",userController.login);
router.post("/wishlist/add",authMiddleware,userController.wishlistAdd);
router.post("/wishlist/remove",authMiddleware,userController.wishlistRemove);

module.exports = router;