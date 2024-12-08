// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/create", userController.createUser);
router.get("/all", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);
router.post("/reset", userController.requestPasswordReset);
router.post("/password", userController.updatePassword);


module.exports = router;
