const Product = require("../models/Product");
const Order = require("../models/Order");
const UserService = require("./UserService");

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
    const items = orderData.items;
    let totalPrice = 0;

    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stockQty < item.quantity) {
        throw new Error(`Product ${item.productId} is not available in the requested quantity`);
      }
      product.stockQty -= item.quantity;
      await product.save();
      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      userId: orderData.userId,
      email: user.email,
      items: orderData.items,
      total_price: totalPrice,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: orderData.shippingAddress,
    });
    return order;
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
      const orders = await Order.find({ userId }).populate("items.productId", "productName price");
      return orders;
    } catch (error) {
      throw new Error("Error fetching orders by user ID: " + error.message);
    }
  }
}

module.exports = new ProductService();
