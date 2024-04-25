// controllers/hotelRoomController.js
const HotelRoom = require("../models/HotelRoom");
const cloudinaryService = require("../services/cloudinaryService");
const hotelServices = require("../services/HotelRoomService")

class HotelRoomController {
  async createHotelRoom(req, res, next) {
    try {
      // Validate request body
      const { roomName, roomType, price } = req.body;
      if (!roomName || !roomType || !price) {
        return res.status(400).json({ message: "Room name, room type, and price are required" });
      }

      // Upload images to Cloudinary
      const images = [];
      for (const file of req.files) {
        const imageUrl = await cloudinaryService.uploadImage(file);
        images.push(imageUrl);
      }

      // Create hotel room
      const hotelRoom = await HotelRoom.create({
        roomName,
        roomType,
        price,
        amenities: req.body.amenities || [], // Optional amenities
        images
      });

      res.status(201).json(hotelRoom);
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
}

module.exports = new HotelRoomController();
