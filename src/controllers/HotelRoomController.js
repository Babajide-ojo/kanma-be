// controllers/hotelRoomController.js
const HotelRoom = require("../models/HotelRoom");
const cloudinaryService = require("../services/CloudinaryService");
const HotelRoomService = require("../services/HotelRoomService");
const hotelServices = require("../services/HotelRoomService")

class HotelRoomController {
  async createHotelRoom(req, res, next) {
    try {
      // Validate request body
      const { roomName, roomType, price , amenities } = req.body;
      if (!roomName || !roomType || !price) {
        return res.status(400).json({ message: "Room name, room type, and price are required" });
      }

      // Upload images to Cloudinary
      let images = [];
    
    
      for (const file of req.files) {
        const imageUrl = await cloudinaryService.uploadImage(file);;
        images.push(imageUrl);
      }
      
    
    

      console.log({
        roomName,
        roomType,
        price,
        amenities, 
        images 
      });

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

  async createBooking(req, res, next) {
    try {
  
      const { userDetails, roomDetails, total_price } = req.body;
      if (!total_price || !userDetails || !roomDetails) {
        return res.status(400).json({ message: "userDetails, roomDetails, total_price are required" });
      }
     
      const booking = await HotelRoomService.createBooking(req.body);
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
}

module.exports = new HotelRoomController();
