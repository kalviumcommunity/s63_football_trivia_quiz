const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./connectDb");
const routes = require("./routes");
const net = require("net");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Use Routes
app.use("/api/quiz", routes);

// Function to check if a port is in use
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        resolve(true);
      })
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
};

// Function to start the server with port conflict handling
const startServer = async () => {
  let PORT = process.env.PORT || 5000;
  let attemptCount = 0;
  const maxAttempts = 10;

  while (attemptCount < maxAttempts) {
    try {
      const inUse = await isPortInUse(PORT);
      
      if (inUse) {
        console.log(`Port ${PORT} is already in use, trying port ${PORT + 1}...`);
        PORT++;
        attemptCount++;
        continue;
      }
      
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}/api/quiz`);
      });
      
      break; // Successfully started server, exit the loop
    } catch (error) {
      console.error(`Failed to start server on port ${PORT}:`, error);
      PORT++;
      attemptCount++;
    }
  }

  if (attemptCount >= maxAttempts) {
    console.error(`Could not find an available port after ${maxAttempts} attempts.`);
    process.exit(1);
  }
};

// Start the server
startServer();
