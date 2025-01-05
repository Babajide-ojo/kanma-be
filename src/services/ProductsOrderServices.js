const Product = require("../models/Product");
const Order = require("../models/Order");
const UserService = require("./UserService");
const mongoose = require('mongoose');
const splitOrder = require('../utils/orderSpliter');

class ProductService {
  async createProduct(productData) {
    try {
      const product = await Product.create(productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      Object.assign(product, updatedData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      await Product.deleteOne({ _id: productId });
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async createOrder(orderData) {
    
    try {
        const user = await UserService.getUserById(orderData.userId);
        if (!user) throw new Error("User not found");

        const subOrders = splitOrder(orderData);

        const savedOrders = [];

        for (const subOrder of subOrders) {
            for (const item of subOrder.items) {
                const product = await Product.findById(item.productId);
                if (!product || product.stockQty < item.quantity) {
                    throw new Error(
                        `Product ${item.productId} is not available in the requested quantity`
                    );
                }
                product.stockQty -= item.quantity;
                await product.save();
            }

            const newOrder = await Order.create({
                userId: subOrder.userId,
                email: subOrder.email,
                item: subOrder.items,
                total_price: subOrder.total_price,
                paymentMethod: subOrder.paymentMethod,
                shippingAddress: subOrder.shippingAddress,
                status: subOrder.status,
            });

            savedOrders.push(newOrder);
        }

        return savedOrders;
    } catch (error) {
        throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      throw new Error("Error fetching all orders: " + error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(orderId, newStatus) {
    console.log('reached service');
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      order.status = newStatus;
      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({ userId }).populate("item.productId");
        return orders;
    } catch (error) {
        throw new Error("Error fetching orders by user ID: " + error.message);
    }
  }


  async getProductsBySeller(sellerId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        throw new Error("Invalid seller ID");
      }

      const products = await Product.find({ seller: sellerId });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByVendor(vendorId) {
      try {
          const orders = await Order.find()
              .populate({
                  path: "item.productId",
                  model: "Product",
                  select: "productName price",
              })
              .populate({
                  path: "item.vendorId",
                  model: "User",
                  select: "name email",
              })
              .exec();

          // Filter orders to include only relevant items for the given vendor
          const filteredOrders = orders
              .map((order) => ({
                  ...order.toObject(),
                  item: order.item.filter(
                      (item) => item.vendorId && item.vendorId._id.toString() === vendorId
                  ),
              }))
              .filter((order) => order.item.length > 0); // Retain only orders with items for this vendor

          return filteredOrders;
      } catch (error) {
          throw error;
      }
  }

}

module.exports = new ProductService();
