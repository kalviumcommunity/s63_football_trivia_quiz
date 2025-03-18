const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./db');
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

// Read the questionData.js file from the client directory
const readQuestionData = () => {
  try {
    // Path to the questionData.js file
    const filePath = path.join(__dirname, '..', 'client', 'src', 'questionData.js');
    
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract the array of questions using regex
    const match = fileContent.match(/const questionData = \[([\s\S]*?)\];/);
    
    if (!match) {
      throw new Error('Could not find questionData array in the file');
    }
    
    // Create a temporary file with just the array
    const tempFilePath = path.join(__dirname, 'temp.js');
    fs.writeFileSync(tempFilePath, `module.exports = [${match[1]}];`);
    
    // Require the temporary file to get the array
    const questions = require('./temp');
    
    // Delete the temporary file
    fs.unlinkSync(tempFilePath);
    
    return questions;
  } catch (error) {
    console.error('Error reading question data:', error);
    process.exit(1);
  }
};

// Format the questions for the database
const formatQuestionsForDB = (questions) => {
  return questions.map(q => ({
    question: q.question,
    options: q.options,
    answer: q.correctAnswer
  }));
};

// Seed the database with questions
const seedDatabase = async () => {
  try {
    // Clear existing questions
    await Quiz.deleteMany({});
    console.log('Cleared existing questions');
    
    // Get questions from the file
    const questions = readQuestionData();
    console.log(`Read ${questions.length} questions from file`);
    
    // Format questions for the database
    const formattedQuestions = formatQuestionsForDB(questions);
    
    // Insert questions into the database
    await Quiz.insertMany(formattedQuestions);
    console.log(`Successfully seeded ${formattedQuestions.length} questions`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();