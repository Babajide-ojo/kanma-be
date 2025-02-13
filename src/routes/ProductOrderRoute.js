const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/ProductController");

const upload = multer({ dest: "uploads/" });

router.post("/create/:sellerId", upload.array("images", 5), productController.createProduct);
router.get("/all", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", upload.array("images", 5), productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
router.get("/products/:sellerId", productController.getProductsBySeller);


router.post("/create-order", productController.createOrder);
router.get("/orders/user/:userId", productController.getAllOrdersByUser);
router.get("/orders/all", productController.getAllOrders);
router.get("/orders/:orderId", productController.getOrderById);
router.put("/orders/:orderId", productController.updateOrderStatus);
router.get("/orders/vendor/:vendorId", productController.getOrdersByVendor);
module.exports = router;