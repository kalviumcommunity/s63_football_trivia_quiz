const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { sequelize, connectToDatabase, syncDatabase } = require('./database');
const { User, Quiz } = require('./models');

// Load environment variables
dotenv.config();

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
    const userPromises = users.map(async (userData) => {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { username: userData.username } });
      if (existingUser) {
        console.log(`User ${userData.username} already exists, skipping...`);
        return existingUser;
      }
      
      // Create new user
      return User.create(userData);
    });
    
    return await Promise.all(userPromises);
  } catch (error) {
    console.error('Error creating users:', error);
    throw error;
  }
};

// Function to create quizzes
const createQuizzes = async (createdUsers) => {
  console.log('Creating quizzes...');
  
  try {
    // Map username to user objects
    const userMap = {};
    createdUsers.forEach(user => {
      userMap[user.username.toLowerCase()] = user;
    });
    
    const quizPromises = quizData.map(async (quizItem, index) => {
      // Find the associated user
      const creatorUsername = quizItem.creator_name.toLowerCase().replace(' ', '_');
      const associatedUser = userMap[creatorUsername];
      
      if (!associatedUser) {
        console.log(`No matching user found for ${quizItem.creator_name}, using first user as fallback`);
      }
      
      // Create the quiz with the user relationship
      return Quiz.create({
        question: quizItem.question,
        options: quizItem.options,
        correctAnswer: quizItem.correctAnswer,
        creator_name: quizItem.creator_name,
        created_by: associatedUser ? associatedUser.id : createdUsers[0].id
      });
    });
    
    return await Promise.all(quizPromises);
  } catch (error) {
    console.error('Error creating quizzes:', error);
    throw error;
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    // Connect to database and sync models
    await connectToDatabase();
    await syncDatabase();
    
    // Create users and quizzes with relationships
    const createdUsers = await createUsers();
    console.log(`Created ${createdUsers.length} users`);
    
    const createdQuizzes = await createQuizzes(createdUsers);
    console.log(`Created ${createdQuizzes.length} quizzes`);
    
    console.log('Seeding completed successfully.');
    
    // Close database connection
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();