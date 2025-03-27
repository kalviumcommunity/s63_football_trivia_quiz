const express = require("express");
const router = express.Router();
const userController = require("./Controllers/UserController.sql");
const auth = require("./middleware/auth");

// Public routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/all", userController.getAllUsers); // Public endpoint for user dropdown

// Protected routes (require authentication)
router.get("/me", auth, userController.getCurrentUser);

module.exports = router;