const express = require("express");
const productController = require("../controllers/productControllers");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Route to handle requests related to all products
router
  .route("/")
  .get(protect, productController.getAllProducts)
  .post(protect, productController.createProduct)
  .patch(protect, productController.updateProduct)
  .put(protect, productController.updateProduct);

// Route to handle requests related to a specific product
router.route("/:model").get(productController.getProduct);

module.exports = router;