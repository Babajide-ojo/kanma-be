// services/hotelRoomService.js
const HotelRoom = require("../models/HotelRoom");
const Booking = require("../models/HotelBooking")
const nodemailer = require("../config/nodemailer")

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

  async createBooking(payload) {
    try {
      const bookingDetails = await Booking.create(payload);
       nodemailer.bookingRecievedEmail(bookingDetails.bookingId, bookingDetails.userDetails.firstName, bookingDetails.userDetails.email, bookingDetails.roomDetails.roomId)
      return bookingDetails;
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

  async getAllBookingsByEmail(email) {
    try {
      const bookings = await Booking.find({email});
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async getAllBookings() {
    try {
      const bookings = await Booking.find();
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  async getHotelRoomById(roomId) {
    try {
      const room = await HotelRoom.findById(roomId);
      if (!room) {
        throw new Error('Hotel room not found');
      }
      return room;
    } catch (error) {
      throw error;
    }
  }

  async getBookingById(bookingId) {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
      return booking;
    } catch (error) {
      throw error;
    }
  }

  async updateHotelRoom(roomId, updatedRoomData) {
    console.log({roomId, updatedRoomData});
    try {
      const room = await HotelRoom.findById(roomId);
      if (!room) {
        throw new Error('Hotel room not found');
      }

      Object.assign(room, updatedRoomData);
      await room.save();
      return room;
    } catch (error) {
      throw error;
    }
  }

  async deleteHotelRoom(roomId) {
    try {
      const room = await HotelRoom.findById(roomId);
      if (!room) {
        throw new Error('Hotel room not found');
      }
      // Remove the room from the database
      await room.remove();
      return { message: 'Hotel room deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updateBookingStatus(bookingId, newStatus) {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }

      // Update the status
      booking.status = newStatus;
      await booking.save();

      return booking;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new HotelRoomService();
