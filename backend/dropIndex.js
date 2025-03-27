require('dotenv').config();
const mongoose = require('mongoose');

const dropQuestionIndex = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    
    // Access the quizzes collection directly
    const db = mongoose.connection.db;
    const quizCollection = db.collection('quizzes');
    
    // Drop the index on the question field
    console.log('Dropping question_1 index...');
    await quizCollection.dropIndex('question_1');
    console.log('Index dropped successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    
    console.log('Index removal completed successfully. You can now restart your application.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If index doesn't exist, that's fine
    if (error.code === 27) {
      console.log('Index does not exist or was already dropped.');
    }
    
    // Close connection even if there was an error
    if (mongoose.connection) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed.');
    }
    
    process.exit(1);
  }
};

// Run the function
dropQuestionIndex();