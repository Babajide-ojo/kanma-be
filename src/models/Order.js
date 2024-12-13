const mongoose = require("mongoose");
const User = require("./User");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    item: [
        {
            vendorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
        }
    ],
    total_price: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["card", "transfer", "cash_on_delivery"],
        default: "card"
    },
    shippingAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

// orderSchema.pre("save", async function (next) {
//     if (!this.isNew) {
//         return next();
//     }
//     try {
//         const latestOrder = await this.constructor
//             .findOne({}, { orderId: 1 })
//             .sort({ orderId: -1 });
//         const newOrderId = latestOrder ? `ORD-${latestOrder.orderId.split('-')[1] * 1 + 1}` : "ORD-1";
//         this.orderId = newOrderId;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

orderSchema.pre("save", function (next) {
    if (!this.isNew) {
        return next();
    }
    this.orderId = `ORD-${uuidv4()}`;
    next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
