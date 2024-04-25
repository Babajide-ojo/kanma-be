// routes/hotelRoomRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const hotelRoomController = require("../controllers/hotelRoomController");

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" });

// POST /api/hotel-rooms
router.post("/create", upload.array("images", 5), hotelRoomController.createHotelRoom);
router.get("/all", hotelRoomController.getAllHotels);

module.exports = router;
