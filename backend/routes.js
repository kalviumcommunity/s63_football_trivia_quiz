const express = require("express");
const router = express.Router();
const Quiz = require("./db");

// Get all quiz questions
router.get("/", async (req, res) => {
    try {
        const questions = await Quiz.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single quiz question by ID
router.get("/:id", async (req, res) => {
    try {
        const question = await Quiz.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new quiz question
router.post("/", async (req, res) => {
    try {
        const newQuestion = new Quiz(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a quiz question
router.put("/:id", async (req, res) => {
    try {
        const updatedQuestion = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(updatedQuestion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a quiz question
router.delete("/:id", async (req, res) => {
    try {
        const deletedQuestion = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({ message: "Question deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
