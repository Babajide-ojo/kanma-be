const mongoose = require("mongoose");
const User = require("./User");

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockQty: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        default: []
    },
    seller: { // Reference to the User schema
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

productSchema.pre("save", async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const latestProduct = await this.constructor
            .findOne({}, { productId: 1 })
            .sort({ productId: -1 });
        const newProductId = latestProduct ? latestProduct.productId + 1 : 1;
        this.productId = newProductId;
        next();
    } catch (error) {
        next(error);
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
