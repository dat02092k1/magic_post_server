const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");

router.post("/auth/login", authController.login);
router.post("/auth/forget-password", authController.forgetPassword);
router.post("/auth/reset-password", authController.resetPassword);
router.post("/auth/logout", authController.logout);

module.exports = router;
