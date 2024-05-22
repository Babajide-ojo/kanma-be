const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema({
    userDetails: {
        type: Object
    },
    email: {
        type: String,
        required: true
    },
    roomDetails: {
        type: Object,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // This line adds createdAt and updatedAt fields

const Booking = mongoose.model("Booking", hotelBookingSchema);

module.exports = Booking;
