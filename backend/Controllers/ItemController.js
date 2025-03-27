const Quiz = require('../models/Quiz');

exports.getItems = async (req, res) => {
  try {
    const { creator, userId } = req.query;
    
    // Build query based on filters
    let query = {};
    
    // Filter by creator_name if provided
    if (creator) {
      query.creator_name = creator;
    }
    
    // Filter by created_by user ID if provided
    if (userId) {
      query.created_by = userId;
    }
    
    // Fetch questions
    const items = await Quiz.find(query)
      .populate('created_by', 'username email') // Populate user details
      .lean();
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Quiz.findById(req.params.id)
      .populate('created_by', 'username email')
      .lean();
      
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Server error while fetching item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { question, options, correctAnswer, creator_name, created_by } = req.body;
    
    // No strict duplicate check anymore - allow similar questions
    
    try {
      // Create new quiz item with user relationship
      const newItem = new Quiz({
        question,
        options,
        correctAnswer,
        creator_name: creator_name || 'Anonymous',
        created_by: created_by || null // Link to User model
      });
      
      // First attempt to save
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (saveError) {
      // Check specifically for duplicate key errors (E11000)
      if (saveError.code === 11000 && saveError.keyPattern && saveError.keyPattern.question) {
        console.log('Handling duplicate question by making it unique');
        
        // Create a unique version of the question by adding a timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const uniqueQuestion = `${question} [${timestamp}]`;
        
        const newItemWithUniqueQuestion = new Quiz({
          question: uniqueQuestion,
          options,
          correctAnswer, 
          creator_name: creator_name || 'Anonymous',
          created_by: created_by || null
        });
        
        try {
          // Second attempt with unique question
          const savedItem = await newItemWithUniqueQuestion.save();
          res.status(201).json(savedItem);
        } catch (secondError) {
          console.error('Error saving with unique question:', secondError);
          res.status(500).json({ 
            message: 'Error while saving question. Please try a different question.'
          });
        }
      } else if (saveError.name === 'ValidationError') {
        return res.status(400).json({
          message: 'Validation error',
          errors: Object.values(saveError.errors).map(err => err.message)
        });
      } else {
        // Handle other types of errors
        throw saveError;
      }
    }
  } catch (error) {
    console.error('Error creating quiz item:', error);
    res.status(500).json({ message: 'Server error while creating quiz item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { question, options, correctAnswer, creator_name, created_by } = req.body;
    
    // Find the item
    const item = await Quiz.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // No strict duplicate check anymore - allow similar questions
    
    // Update the item
    const updates = {};
    if (question) updates.question = question;
    if (options) updates.options = options;
    if (correctAnswer !== undefined) updates.correctAnswer = correctAnswer;
    if (creator_name) updates.creator_name = creator_name;
    if (created_by) updates.created_by = created_by;
    
    const updatedItem = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    res.json(updatedItem);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    console.error('Error updating quiz item:', error);
    res.status(500).json({ message: 'Server error while updating quiz item' });
  }
};
exports.getItemsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Find all quizzes created by the specified user
    const items = await Quiz.find({ created_by: userId })
      .populate('created_by', 'username email')
      .lean();
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items by user:', error);
    res.status(500).json({ message: 'Server error while fetching items by user' });
  }
};
exports.deleteItem = async (req, res) => {
  try {
    // Find the item
    const item = await Quiz.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Delete the item
    await Quiz.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz item:', error);
    res.status(500).json({ message: 'Server error while deleting quiz item' });
  }
};