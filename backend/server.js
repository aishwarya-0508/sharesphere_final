import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import resourceRoutes from './routes/resources.js';
import requestRoutes from './routes/requests.js';
import notificationRoutes from './routes/notifications.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// Middleware
// ======================

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======================
// MongoDB Connection
// ======================

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ======================
// API Routes
// ======================

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

// ======================
// Test Route
// ======================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ShareSphere Backend Running'
  });
});

// ======================
// Error Handler
// ======================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ======================
// Start Server (Local)
// ======================

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;