// services/hotelRoomService.js
const HotelRoom = require("../models/HotelRoom");

class HotelRoomService {
  async createHotelRoom(roomData) {
    try {
      const latestRoom = await HotelRoom.findOne({}, { roomId: 1 }).sort({ roomId: -1 });
      const newRoomId = latestRoom ? latestRoom.roomId + 1 : 1;

      const hotelRoom = await HotelRoom.create({ ...roomData, roomId: newRoomId });
      return hotelRoom;
    } catch (error) {
      throw error;
    }
  }

  async getAllHotels() {
    try {
      const hotels = await HotelRoom.find();
      return hotels;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new HotelRoomService();
