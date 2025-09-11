import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import authRoutes from './routes/auth.route.js';
import scoreRoutes from './routes/score.route.js';
import testControlRoutes from './routes/test.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Mongodb is connected');
}).catch((err) => {
  console.log(err);
});

const __dirname = path.resolve();
const app = express();
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies (for FormData)

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Allow credentials
}));

app.use('/api/auth', authRoutes); 
app.use('/api/score', scoreRoutes); 
app.use('/api/test', testControlRoutes)
// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err); // Log the error for debugging
  
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Handle non-existent routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
})
