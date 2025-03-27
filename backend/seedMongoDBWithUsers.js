const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const UserModel = require('./models/User');
const QuizModel = require('./models/Quiz');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Sample users data
const users = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'Password123'
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    password: 'Password456'
  },
  {
    username: 'mike_jones',
    email: 'mike.jones@example.com',
    password: 'Password789'
  }
];

// Sample quiz questions
const quizData = [
  {
    question: 'Which team has won the most UEFA Champions League titles?',
    options: ['Barcelona', 'Bayern Munich', 'Real Madrid', 'Liverpool'],
    correctAnswer: 2,
    creator_name: 'John Doe'
  },
  {
    question: 'Who is the all-time top scorer in FIFA World Cup history?',
    options: ['Lionel Messi', 'Cristiano Ronaldo', 'Miroslav Klose', 'Pelé'],
    correctAnswer: 2,
    creator_name: 'Jane Smith'
  },
  {
    question: 'Which country won the first FIFA World Cup in 1930?',
    options: ['Brazil', 'Italy', 'Argentina', 'Uruguay'],
    correctAnswer: 3,
    creator_name: 'Mike Jones'
  },
  {
    question: 'Which player has won the most Ballon d\'Or awards?',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Michel Platini', 'Johan Cruyff'],
    correctAnswer: 1,
    creator_name: 'John Doe'
  },
  {
    question: 'Which English club has the most Premier League titles?',
    options: ['Liverpool', 'Chelsea', 'Arsenal', 'Manchester United'],
    correctAnswer: 3,
    creator_name: 'Jane Smith'
  },
  {
    question: 'Who scored the "Hand of God" goal in the 1986 World Cup?',
    options: ['Pelé', 'Diego Maradona', 'Michel Platini', 'Zinedine Zidane'],
    correctAnswer: 1,
    creator_name: 'Mike Jones'
  }
];

// Function to create users
const createUsers = async () => {
  console.log('Creating users...');
  
  try {
    // Clear existing users
    await UserModel.deleteMany({});
    console.log('Cleared existing users');
    
    const userPromises = users.map(async (userData) => {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create new user with hashed password
      return UserModel.create({
        ...userData,
        password: hashedPassword
      });
    });
    
    const createdUsers = await Promise.all(userPromises);
    console.log(`Created ${createdUsers.length} users`);
    return createdUsers;
  } catch (error) {
    console.error('Error creating users:', error);
    throw error;
  }
};

// Function to create quizzes with user relationships
const createQuizzes = async (createdUsers) => {
  console.log('Creating quizzes...');
  
  try {
    // Clear existing quizzes
    await QuizModel.deleteMany({});
    console.log('Cleared existing quizzes');
    
    // Map username to user objects
    const userMap = {};
    createdUsers.forEach(user => {
      const formattedName = user.username.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      userMap[formattedName] = user;
    });
    
    const quizPromises = quizData.map(async (quizItem) => {
      // Find the associated user
      const associatedUser = userMap[quizItem.creator_name] || createdUsers[0];
      
      // Create the quiz with the user relationship
      return QuizModel.create({
        question: quizItem.question,
        options: quizItem.options,
        correctAnswer: quizItem.correctAnswer,
        creator_name: quizItem.creator_name,
        created_by: associatedUser._id // Reference the user's ObjectId
      });
    });
    
    const createdQuizzes = await Promise.all(quizPromises);
    console.log(`Created ${createdQuizzes.length} quizzes with user relationships`);
    return createdQuizzes;
  } catch (error) {
    console.error('Error creating quizzes:', error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    // Create users and quizzes with relationships
    const createdUsers = await createUsers();
    const createdQuizzes = await createQuizzes(createdUsers);
    
    console.log('Seeding completed successfully.');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();