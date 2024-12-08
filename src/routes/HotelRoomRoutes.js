// routes/hotelRoomRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const hotelRoomController = require("../controllers/HotelRoomController");

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" });

// POST /api/hotel-rooms
router.post("/create", upload.array("images", 5), hotelRoomController.createHotelRoom);//
router.post("/create-booking", hotelRoomController.createBooking);//
router.get("/all", hotelRoomController.getAllHotels);//
router.get("/user-bookings", hotelRoomController.getAllBookingsByEmail);//
router.get("/bookings", hotelRoomController.getAllBookings);//
router.get("/booking/:bookingId", hotelRoomController.getBookingById);
router.put("/booking/:bookingId", hotelRoomController.updateBookingStatus);

// Routes for retrieving hotel room and booking by ID
router.get("/room/:roomId", hotelRoomController.getHotelRoomById);
router.put("/room/:roomId", upload.array("images", 5), hotelRoomController.updateHotelRoom);
router.delete("/room/:roomId", hotelRoomController.deleteHotelRoom);
module.exports = router;
