// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/users", userController.createUser);
router.get("/users/all", userController.getAllUsers);
router.get("/users/:email", userController.getUserByEmail);
router.post("/users/reset", userController.requestPasswordReset);
router.post("/users/password", userController.updatePassword);


module.exports = router;
