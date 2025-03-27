const User = require('./User.sql');
const Quiz = require('./Quiz.sql');

// Set up associations between models
const setupAssociations = () => {
  // A Quiz belongs to a User
  Quiz.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator'
  });

  // A User has many Quizzes
  User.hasMany(Quiz, {
    foreignKey: 'created_by',
    as: 'quizzes'
  });
};

// Call the function to set up associations
setupAssociations();

module.exports = {
  User,
  Quiz
};