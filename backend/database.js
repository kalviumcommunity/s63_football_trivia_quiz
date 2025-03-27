const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Log connection parameters
console.log('Database connection parameters:');
console.log('Host:', process.env.DB_HOST || 'localhost');
console.log('Port:', process.env.DB_PORT || '3306');
console.log('Database:', process.env.DB_NAME || 'vishudb');
console.log('User:', process.env.DB_USER || 'root');

// Initialize Sequelize with SQLite for local development
let sequelize;
let dbType = 'sqlite';

// Use SQLite configuration for local development, 
// but maintain SQL schema structure for compatibility with MySQL
sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', 
  logging: false,
  define: {
    // Keep timestamps for proper SQL structure
    timestamps: true
  }
});

console.log('Using SQLite database for local development (SQL schema compatible)');

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to SQLite database');
    return true;
  } catch (error) {
    console.error('Unable to connect to database:', error);
    return false;
  }
};

// Function to sync database models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
    return true;
  } catch (error) {
    console.error('Unable to sync database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
  syncDatabase,
  dbType
};