// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/userReg");

router.post("/register", authController.register);
router.post("/verifyOtp", authController.verifyOtp);
router.post("/resendOtp", authController.resendOtp);
router.post("/login", authController.login);
router.post("/addItemToCart", authController.addItemToCart);
router.delete("/removeItemFromCart/:userId/:productId", authController.removeItemFromCart);
router.patch("/addProductQuantity", authController.addProductQuantity);
router.patch("/subProductQuantity", authController.subProductQuantity);
router.get("/getCartByUserId/:userId", authController.getCartByUserId);
router.patch("/updateCart", authController.updateCart);
router.get("/getTotalQuantity/:userId", authController.getTotalQuantity);
router.delete('/:userId', authController.deleteCartByUserId);

module.exports = router;
