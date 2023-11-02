const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

// Route to handle user signup requests
router.post("/signup", authController.signUp);

// Route to handle user login requests
router
  .post("/login", authController.login)
  .get("/login", authController.isLoggedIn);

// Route to handle user logout requests
router.delete("/logout", authController.logout);

module.exports = router;