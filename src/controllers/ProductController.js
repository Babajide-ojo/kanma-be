const Product = require("../models/Product");
const cloudinaryService = require("../services/CloudinaryService");
const ProductOrderService = require("../services/ProductsOrderServices");
const nodemailer = require("../config/nodemailer");

class ProductOrderController {
  async createProduct(req, res, next) {
    const { sellerId } = req.params;
    try {
      const { productName, price, stockQty, description } = req.body;
      if (!productName || !price || !stockQty) {
        return res.status(400).json({ message: "Product name, price, and stock quantity are required" });
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

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async   updateProduct(req, res, next) {
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
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const { userId, items, paymentMethod, shippingAddress } = req.body;
      if (!userId || !items  || !paymentMethod || !shippingAddress) {
        return res.status(400).json({ message: "All order details are required" });
      }

      const order = await ProductOrderService.createOrder({
        userId,
        items,
        paymentMethod,
        shippingAddress,
      }); 

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await ProductOrderService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getAllOrdersByUser(req, res, next) {
    const { userId } = req.query;
    try {
      const orders = await ProductOrderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    const { productId } = req.params;
    try {
      const product = await ProductOrderService.getProductById(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { productId } = req.params;
    try {
      const result = await ProductOrderService.deleteProduct(productId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req, res, next) {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await ProductOrderService.updateOrderStatus(orderId, status);
      const order = await ProductOrderService.getOrderById(orderId);

      if (status === "cancelled") {
        nodemailer.orderCancelledEmail(order);
      }

      if (status === "confirmed") {
        nodemailer.orderConfirmedEmail(order);
      }

      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = await ProductOrderService.getAllOrders();
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found" });
      }
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }


  async getOrderById(req, res, next){
    const { orderId } = req.params;
    try{
      const orders = await ProductOrderService.getOrderById(orderId);
      res.json(orders);
    }catch(error){
      next(error);
    }
  }
}

module.exports = new ProductOrderController();
