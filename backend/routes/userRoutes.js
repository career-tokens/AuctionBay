const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const addProductController = require("../controllers/addProductController");
const getUserController = require("../controllers/getUserController");

// Route to handle user signup requests
router.post("/signup", authController.signUp);

// Route to handle user login requests
router
  .post("/login", authController.login)
  .get("/login", authController.isLoggedIn);

// Route to handle user logout requests
router.delete("/logout", authController.logout);

// Route to get the user
router.get("/:username", getUserController.getUser);
// Route to add product listed by the user
router.post("/addproduct", addProductController.addProduct)

module.exports = router;