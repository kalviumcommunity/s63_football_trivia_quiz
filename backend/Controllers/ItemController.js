const items = []; // Temporary storage for demo

exports.getItems = (req, res) => {
  res.json(items);
};

exports.getItem = (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

exports.createItem = (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    // Validate required fields
    if (!question || !options || correctAnswer === undefined) {
      return res.status(400).json({
        message: 'Missing required fields',
        errors: {
          question: !question ? 'Question is required' : null,
          options: !options ? 'Options are required' : null,
          correctAnswer: correctAnswer === undefined ? 'Correct answer is required' : null
        }
      });
    }

    // Validate question format
    if (typeof question !== 'string' || question.trim().length < 5) {
      return res.status(400).json({
        message: 'Question must be a string with at least 5 characters'
      });
    }

    // Validate options
    if (!Array.isArray(options)) {
      return res.status(400).json({
        message: 'Options must be an array'
      });
    }

    if (options.length < 2) {
      return res.status(400).json({
        message: 'At least 2 options are required'
      });
    }

    // Validate that all options are strings
    const invalidOptions = options.filter(opt => typeof opt !== 'string' || opt.trim().length === 0);
    if (invalidOptions.length > 0) {
      return res.status(400).json({
        message: 'All options must be non-empty strings'
      });
    }

    // Validate correct answer
    if (!Number.isInteger(correctAnswer) || correctAnswer < 0 || correctAnswer >= options.length) {
      return res.status(400).json({
        message: `Correct answer must be a valid index between 0 and ${options.length - 1}`
      });
    }

    // Check for duplicate questions
    const duplicateQuestion = items.find(item => 
      item.question.toLowerCase() === question.toLowerCase()
    );
    
    if (duplicateQuestion) {
      return res.status(400).json({
        message: 'A question with similar content already exists'
      });
    }

    // Create new item with validation passed
    const newItem = { 
      id: Date.now().toString(), 
      question, 
      options, 
      correctAnswer,
      createdAt: new Date()
    };
    
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating quiz item:', error);
    res.status(500).json({ message: 'Server error while creating quiz item' });
  }
};

exports.updateItem = (req, res) => {
  try {
    const index = items.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Item not found' });
    
    const { question, options, correctAnswer } = req.body;
    const currentItem = items[index];
    
    // Create a copy of the item with proposed updates
    let updatedItem = { ...currentItem };
    
    // Validate question if it's being updated
    if (question !== undefined) {
      // Validate question format
      if (typeof question !== 'string' || question.trim().length < 5) {
        return res.status(400).json({
          message: 'Question must be a string with at least 5 characters'
        });
      }
      
      // Check for duplicate questions (only if the question is changing)
      if (question.toLowerCase() !== currentItem.question.toLowerCase()) {
        const duplicateQuestion = items.find(item => 
          item.id !== currentItem.id && 
          item.question.toLowerCase() === question.toLowerCase()
        );
        
        if (duplicateQuestion) {
          return res.status(400).json({
            message: 'A question with similar content already exists'
          });
        }
      }
      
      updatedItem.question = question;
    }
    
    // Validate options if they're being updated
    if (options !== undefined) {
      // Validate options array
      if (!Array.isArray(options)) {
        return res.status(400).json({
          message: 'Options must be an array'
        });
      }
      
      if (options.length < 2) {
        return res.status(400).json({
          message: 'At least 2 options are required'
        });
      }
      
      // Validate that all options are strings
      const invalidOptions = options.filter(opt => typeof opt !== 'string' || opt.trim().length === 0);
      if (invalidOptions.length > 0) {
        return res.status(400).json({
          message: 'All options must be non-empty strings'
        });
      }
      
      updatedItem.options = options;
      
      // If options change but correctAnswer doesn't, validate the existing correctAnswer still works
      if (correctAnswer === undefined && updatedItem.correctAnswer >= options.length) {
        return res.status(400).json({
          message: `Current correct answer index is invalid for the new options. Please update the correct answer.`
        });
      }
    }
    
    // Validate correctAnswer if it's being updated
    if (correctAnswer !== undefined) {
      const optionsToCheck = options || currentItem.options;
      
      if (!Number.isInteger(correctAnswer) || correctAnswer < 0 || correctAnswer >= optionsToCheck.length) {
        return res.status(400).json({
          message: `Correct answer must be a valid index between 0 and ${optionsToCheck.length - 1}`
        });
      }
      
      updatedItem.correctAnswer = correctAnswer;
    }
    
    // Update timestamp
    updatedItem.updatedAt = new Date();
    
    // Apply validated updates
    items[index] = updatedItem;
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating quiz item:', error);
    res.status(500).json({ message: 'Server error while updating quiz item' });
  }
};

exports.deleteItem = (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  items.splice(index, 1);
  res.json({ message: 'Item deleted successfully' });
};
