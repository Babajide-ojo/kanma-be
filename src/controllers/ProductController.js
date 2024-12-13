const Product = require("../models/Product");
const cloudinaryService = require("../services/CloudinaryService");
const ProductOrderService = require("../services/ProductsOrderServices");
const nodemailer = require("../config/nodemailer");
const { successResponse, errorResponse } = require("../utils/response");
const UserService = require("../services/UserService");
const User = require("../models/User");

class ProductOrderController {
  async createProduct(req, res, next) {
    const { sellerId } = req.params;
    try {
      const { productName, price, stockQty, description } = req.body;
      if (!productName || !price || !stockQty) {
        return errorResponse(res, 400, "Product name, price, and stock quantity are required");
      }

      let images = [];
      for (const file of req.files) {
        const imageUrl = await cloudinaryService.uploadImage(file);
        images.push(imageUrl);
      }

      const product = await ProductOrderService.createProduct({
        productName,
        price,
        stockQty,
        images, 
        description,
        seller: sellerId,
      });

      return successResponse(res, 201, "Product created successfully", product);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async updateProduct(req, res, next) {
    const { productId } = req.params;
    const { productName, price, stockQty } = req.body;
    try {
      let updatedProductData = {};

      if (productName) updatedProductData.productName = productName;
      if (price) updatedProductData.price = price;
      if (stockQty) updatedProductData.stockQty = stockQty;

      if (req.files && req.files.length > 0) {
        const images = [];
        for (const file of req.files) {
          const imageUrl = await cloudinaryService.uploadImage(file);
          images.push(imageUrl);
        }
        updatedProductData.images = images;
      }

      const updatedProduct = await ProductOrderService.updateProduct(productId, updatedProductData);
      return successResponse(res, 200, "Product updated successfully", updatedProduct);
    } catch (error) {
      console.log(error);
      return errorResponse(res, 500, error.message);
    }
  }

  async createOrder(req, res, next) {
    try {
        const { userId, email, item, paymentMethod, shippingAddress } = req.body;

        if (!userId || !email || !item || !paymentMethod || !shippingAddress) {
            return errorResponse(res, 400, "All order details are required");
        }

        const savedOrders = await ProductOrderService.createOrder({
            userId,
            email,
            item,
            paymentMethod,
            shippingAddress,
        });

        return successResponse(res, 201, "Orders created successfully", savedOrders);
    } catch (error) {
        return errorResponse(res, 500, error.message);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await ProductOrderService.getAllProducts();
      return successResponse(res, 200, "Products retrieved successfully", products);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getAllOrdersByUser(req, res, next) {
    const { userId } = req.query;
    try {
      const orders = await ProductOrderService.getOrdersByUserId(userId);
      return successResponse(res, 200, "Orders retrieved successfully", orders);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getProductById(req, res, next) {
    const { productId } = req.params;
    try {
      const product = await ProductOrderService.getProductById(productId);
      return successResponse(res, 200, "Product retrieved successfully", product);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async deleteProduct(req, res, next) {
    const { productId } = req.params;
    try {
      const result = await ProductOrderService.deleteProduct(productId);
      return successResponse(res, 200, "Product deleted successfully", result);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async updateOrderStatus(req, res, next) {
    console.log('reached controller');
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await ProductOrderService.updateOrderStatus(orderId, status);
      const order = await ProductOrderService.getOrderById(orderId);

      const user = await UserService.getUserById(order.userId);
      if (status === "cancelled") {
        nodemailer.orderCancelledEmail(user.firstName, order.email, order.orderId);
      }

      if (status === "confirmed") {
        nodemailer.orderConfirmedEmail(user.firstName, order.email, order.orderId);
      }
      return successResponse(res, 200, "Order status updated successfully", updatedOrder);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await ProductOrderService.getAllOrders();
      if (!orders.length) {
        return errorResponse(res, 404, "No orders found");
      }
      return successResponse(res, 200, "Orders retrieved successfully", orders);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getOrderById(req, res, next) {
    const { orderId } = req.params;
    try {
      const order = await ProductOrderService.getOrderById(orderId);
      return successResponse(res, 200, "Order retrieved successfully", order);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getProductsBySeller(req, res, next) {
    const { sellerId } = req.params;
    try {
      const products = await ProductOrderService.getProductsBySeller(sellerId);

      if (!products.length) {
        return errorResponse(res, 404, "No products found for this seller");
      }

      return successResponse(res, 200, "Products retrieved successfully", products);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  async getOrdersByVendor(req, res, next) {
    const { vendorId } = req.params;

    try {
      const orders = await ProductOrderService.getOrdersByVendor(vendorId);

      if (!orders.length) {
        return successResponse(res, 404, "No orders found for this vendor", []);
      }

      return successResponse(res, 200, "Orders fetched successfully", orders);
    } catch (error) {
      return errorResponse(res, 500, "Error fetching orders for vendor", error.message);
    }
  }
}

module.exports = new ProductOrderController();
