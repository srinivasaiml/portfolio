const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter, contactLimiter } = require('./middleware/rateLimiter');
const { trackVisitor } = require('./middleware/visitorTracker');

connectDB();

const app = express();

// Middleware
app.use(helmet());

const whitelist = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret-key']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.set('trust proxy', 1);

app.use('/api', trackVisitor);
app.use('/api/admin', adminRoutes);
app.use('/api/', generalLimiter);
app.use('/api/contact', contactLimiter, contactRoutes);

// ---------------------------
// Health check route
// ---------------------------
app.get('/api/health', async (req, res) => {
  let mongoStatus = 'unknown';
  let emailStatus = 'unknown';

  // Check MongoDB connection
  try {
    const mongoose = require('mongoose');
    mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  } catch (err) {
    mongoStatus = 'error';
  }

  // Check email transporter
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.verify();
    emailStatus = 'verified';
  } catch (err) {
    emailStatus = 'failed';
  }

  res.json({
    success: true,
    message: 'Server is running',
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
    mongo: mongoStatus,
    email: emailStatus
  });
});

// Catch-all for undefined routes
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = app;
