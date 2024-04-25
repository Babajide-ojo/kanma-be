const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' // Token expires after 1 hour
    }
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

module.exports = ResetToken;
