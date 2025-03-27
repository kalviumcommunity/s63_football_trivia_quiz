const { Quiz, User } = require('../models');
const { Op } = require('sequelize');

// Get all quiz items with optional creator filter
exports.getItems = async (req, res) => {
  try {
    const { creator, userId } = req.query;
    
    // Build query based on filters
    const query = {};
    
    if (creator) {
      query.creator_name = creator;
    }
    
    if (userId) {
      query.created_by = userId;
    }
    
    // Fetch questions
    const items = await Quiz.findAll({
      where: query,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
};

// Get quiz items by user ID
exports.getItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Validate that user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Fetch quizzes created by the user
    const items = await Quiz.findAll({
      where: { created_by: userId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by user:', error);
    res.status(500).json({ message: 'Server error while fetching items by user' });
  }
};

// Get a single quiz item by ID
exports.getItem = async (req, res) => {
  try {
    const item = await Quiz.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
      
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Server error while fetching item' });
  }
};

// Create a new quiz item
exports.createItem = async (req, res) => {
  try {
    const { question, options, correctAnswer, creator_name, userId } = req.body;
    
    // Validate required fields
    if (!question || !options || correctAnswer === undefined) {
      return res.status(400).json({ 
        message: 'Required fields missing',
        errors: {
          question: !question ? 'Question is required' : null,
          options: !options ? 'Options are required' : null,
          correctAnswer: correctAnswer === undefined ? 'Correct answer is required' : null
        }
      });
    }
    
    // Create new quiz item
    const newItem = await Quiz.create({
      question,
      options,
      correctAnswer,
      creator_name: creator_name || 'Anonymous',
      created_by: userId || null
    });
    
    // If there's a userId, validate and associate with user
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        await newItem.setCreator(user);
      }
    }
    
    // Fetch the created quiz with user association
    const createdQuiz = await Quiz.findByPk(newItem.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    
    res.status(201).json(createdQuiz);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      });
    }
    
    console.error('Error creating quiz item:', error);
    res.status(500).json({ message: 'Server error while creating quiz item' });
  }
};

// Update an existing quiz item
exports.updateItem = async (req, res) => {
  try {
    const { question, options, correctAnswer, creator_name, userId } = req.body;
    
    // Find the item
    const item = await Quiz.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Build updates object with only provided fields
    const updates = {};
    if (question !== undefined) updates.question = question;
    if (options !== undefined) updates.options = options;
    if (correctAnswer !== undefined) updates.correctAnswer = correctAnswer;
    if (creator_name !== undefined) updates.creator_name = creator_name;
    if (userId !== undefined) updates.created_by = userId;
    
    // Update the item
    await item.update(updates);
    
    // If there's a userId, validate and associate with user
    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        await item.setCreator(user);
      }
    }
    
    // Fetch the updated quiz with user association
    const updatedQuiz = await Quiz.findByPk(item.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    
    res.json(updatedQuiz);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(err => err.message)
      });
    }
    
    console.error('Error updating quiz item:', error);
    res.status(500).json({ message: 'Server error while updating quiz item' });
  }
};

// Delete a quiz item
exports.deleteItem = async (req, res) => {
  try {
    // Find the item
    const item = await Quiz.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Delete the item
    await item.destroy();
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz item:', error);
    res.status(500).json({ message: 'Server error while deleting quiz item' });
  }
};