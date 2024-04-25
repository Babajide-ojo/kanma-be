// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/users", userController.createUser);
router.get("/users/all", userController.getAllUsers);
router.get("/users/:email", userController.getUserByEmail);


module.exports = router;
