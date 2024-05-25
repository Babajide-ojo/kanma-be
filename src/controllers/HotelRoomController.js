// controllers/hotelRoomController.js
const HotelRoom = require("../models/HotelRoom");
const cloudinaryService = require("../services/CloudinaryService");
const HotelRoomService = require("../services/HotelRoomService");
const hotelServices = require("../services/HotelRoomService")
const nodemailer = require("../config/nodemailer");

class HotelRoomController {
  async createHotelRoom(req, res, next) {
    try {
      // Validate request body
      const { roomName, roomType, price, amenities } = req.body;
      if (!roomName || !roomType || !price) {
        return res.status(400).json({ message: "Room name, room type, and price are required" });
      }

      // Upload images to Cloudinary
      let images = [];


      for (const file of req.files) {
        const imageUrl = await cloudinaryService.uploadImage(file);;
        images.push(imageUrl);
      }

      // Create hotel room
      const hotelRoom = await HotelRoom.create({
        roomName,
        roomType,
        price,
        amenities,
        images
      });



      res.status(201).json(hotelRoom);
    } catch (error) {
      next(error);
    }
  }

  async updateHotelRoom(req, res, next) {
    const { roomId } = req.params;
    const { roomName, roomType, price, amenities } = req.body;
    console.log({ roomName });

    try {
      let updatedImages = [];
      let updatedRoomData = {}

      if (roomName) {
        updatedRoomData.roomName = roomName;
      }
      if (roomType) {
        updatedRoomData.roomType = roomType;
      }
      if (price) {
        updatedRoomData.price = price;
      }
      if (amenities) {
        updatedRoomData.amenities = amenities;
      }
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const imageUrl = await cloudinaryService.uploadImage(file);
          updatedImages.push(imageUrl);
        }
        updatedRoomData.images = updatedImages;
      }

      const updatedRoom = await HotelRoomService.updateHotelRoom(roomId, updatedRoomData);
      res.json(updatedRoom);
    } catch (error) {
      next(error);
    }
  }

  async createBooking(req, res, next) {
    try {
      const { userDetails, roomDetails, total_price } = req.body;
      if (!total_price || !userDetails || !roomDetails) {
        return res.status(400).json({ message: "userDetails, roomDetails, total_price are required" });
      }

      // Generate a random 8-digit booking ID
      const bookingId = Math.floor(10000000 + Math.random() * 90000000);

      // Add the generated booking ID to the request body
      const bookingData = { ...req.body, bookingId };

      const booking = await HotelRoomService.createBooking(bookingData);
      const roomUpdate = await HotelRoomService.updateRoomStatus(roomDetails?.roomType?._id, false);
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }


  async getAllHotels(req, res, next) {
    try {
      const hotels = await hotelServices.getAllHotels();
      res.json(hotels);
    } catch (error) {
      next(error);
    }
  }

  async getAllBookingsByEmail(req, res, next) {
    const { email } = req.query
    try {
      const hotels = await hotelServices.getAllBookingsByEmail(email);
      res.json(hotels);
    } catch (error) {
      next(error);
    }
  }

  async getAllBookings(req, res, next) {

    try {
      const hotels = await hotelServices.getAllBookings();
      res.json(hotels);
    } catch (error) {
      next(error);
    }
  }

  async getHotelRoomById(req, res, next) {
    const { roomId } = req.params;
    try {
      const room = await HotelRoomService.getHotelRoomById(roomId);
      res.json(room);
    } catch (error) {
      next(error);
    }
  }

  async getBookingById(req, res, next) {
    const { bookingId } = req.params;
    try {
      const booking = await HotelRoomService.getBookingById(bookingId);
      res.json(booking);
    } catch (error) {
      next(error);
    }
  }

  async deleteHotelRoom(req, res, next) {
    const { roomId } = req.params;
    try {
      const result = await HotelRoomService.deleteHotelRoom(roomId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async updateBookingStatus(req, res, next) {
    const { bookingId } = req.params;
    const { status } = req.body;
    try {
      const updatedBooking = await HotelRoomService.updateBookingStatus(bookingId, status);
      const booking = await HotelRoomService.getBookingById(bookingId);
      if (status === "cancelled") {
         await HotelRoomService.updateRoomStatus(booking.roomDetails?.roomType?._id, true);
         nodemailer.bookingCancelledEmail(booking?.bookingId, booking?.userDetails?.firstName, booking?.userDetails?.email, booking?.roomDetails?.roomId);
      }

      if (status === "confirmed") {
        await HotelRoomService.updateRoomStatus(booking.roomDetails?.roomType?._id, false);
        nodemailer.bookingConfirmedEmail(booking?.bookingId, booking?.userDetails?.firstName, booking?.userDetails?.email, booking?.roomDetails?.roomId);
      }
      res.json(updatedBooking);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HotelRoomController();
