const mongoose = require("mongoose");

const hotelBookingSchema = new mongoose.Schema({
    userDetails: {
        type: Object
    },
    bookingId: {
        type: String
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
}, 
{ timestamps: true }); 

const Booking = mongoose.model("Booking", hotelBookingSchema);

module.exports = Booking;
