const express = require("express");
const router = express.Router();
const itemController = require("./Controllers/ItemController");

// All routes are public now
router.get("/", itemController.getItems);
router.get("/user/:userId", itemController.getItemsByUser); // New endpoint to fetch quizzes by user
router.get("/:id", itemController.getItem);
router.post("/", itemController.createItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;