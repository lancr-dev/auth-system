import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data sent | Read form submissions (e.g., login/register forms)
app.use(cookieParser()); // Parse cookies and make them available in req.cookies | // Read authentication cookies (e.g., JWT token)

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authentication API is running..',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
