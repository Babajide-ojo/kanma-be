// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

router.post("/login", authController.login);
router.post("/admin-login", authController.adminLogin);
router.post("/reset-password", authController.requestPasswordReset);

module.exports = router;

