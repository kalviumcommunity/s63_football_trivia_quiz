const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Question is required'
      },
      len: {
        args: [5, 500],
        msg: 'Question must be at least 5 characters long'
      }
    }
  },
  options: {
    type: DataTypes.JSON, // Store array of options as JSON
    allowNull: false,
    validate: {
      isValidOptions(value) {
        if (!Array.isArray(value)) {
          throw new Error('Options must be an array');
        }
        if (value.length < 2) {
          throw new Error('At least 2 options are required');
        }
        if (!value.every(opt => typeof opt === 'string' && opt.trim().length > 0)) {
          throw new Error('All options must be non-empty strings');
        }
      }
    }
  },
  correctAnswer: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isCorrectAnswerValid(value) {
        const options = this.options;
        if (value < 0 || value >= options.length) {
          throw new Error('Correct answer must be a valid option index');
        }
      }
    }
  },
  creator_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Anonymous'
  },
  // This is the foreign key to link Quiz with User
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users', // This refers to the table name (Sequelize pluralizes model names)
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Function to associate Quiz with other models
Quiz.associate = (models) => {
  Quiz.belongsTo(models.User, {
    foreignKey: 'created_by',
    as: 'creator'
  });
};

module.exports = Quiz;