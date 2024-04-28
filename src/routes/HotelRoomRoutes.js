// routes/hotelRoomRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const hotelRoomController = require("../controllers/HotelRoomController");

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" });

// POST /api/hotel-rooms
router.post("/create", upload.array("images", 5), hotelRoomController.createHotelRoom);
router.post("/create-booking", hotelRoomController.createBooking);
router.get("/all", hotelRoomController.getAllHotels);
router.get("/user-bookings", hotelRoomController.getAllBookingsByEmail);

module.exports = router;
