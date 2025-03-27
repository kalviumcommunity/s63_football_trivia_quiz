const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    minlength: [5, 'Question must be at least 5 characters long']
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.every(opt => opt.trim().length > 0);
      },
      message: 'At least 2 non-empty options are required'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer is required'],
    validate: {
      validator: function(v) {
        return v >= 0 && v < this.options.length;
      },
      message: 'Correct answer must be a valid option index'
    }
  },
  creator_name: {
    type: String,
    required: [true, 'Creator name is required'],
    trim: true,
    default: 'Anonymous'
  },
  // Reference to the User who created this quiz
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Not required to maintain backward compatibility
    required: false
  }
}, {
  timestamps: true
});

// Add index for better search performance but without strict uniqueness
quizSchema.index({ question: 1 });

module.exports = mongoose.model('Quiz', quizSchema);