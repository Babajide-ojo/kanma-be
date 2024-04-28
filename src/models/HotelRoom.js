const mongoose = require("mongoose");

const hotelRoomSchema = new mongoose.Schema({
    roomId: {
        type: Number,
        unique: true
    },
    roomName: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: String,
    },
    images: {
        type: [String],
        default: []
    },
    availability: {
        type: Boolean,
        default: true // Default availability to true
    }
});

// Auto-increment room ID before saving
hotelRoomSchema.pre("save", async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const latestRoom = await this.constructor
            .findOne({}, { roomId: 1 })
            .sort({ roomId: -1 });
        const newRoomId = latestRoom ? latestRoom.roomId + 1 : 1;
        this.roomId = newRoomId;
        next();
    } catch (error) {
        next(error);
    }
});

const HotelRoom = mongoose.model("HotelRoom", hotelRoomSchema);

module.exports = HotelRoom;
