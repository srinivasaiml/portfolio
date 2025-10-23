// Import dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

// Import local modules
const connectDB = require('./config/database');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
// We still need to import generalLimiter, but contactLimiter will be moved to contactRoutes.js
const { generalLimiter, contactLimiter } = require('./middleware/rateLimiter'); 
const { trackVisitor } = require('./middleware/visitorTracker');

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const whitelist = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret-key'],
};

app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust reverse proxy (useful for deployments on Vercel, Render, etc.)
app.set('trust proxy', 1);

// ====================================================================
// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy and running!" });
});
// ====================================================================


// General Middleware & API Routes
app.use('/api', trackVisitor); // This middleware will run for all subsequent /api routes
app.use('/api/admin', adminRoutes);
app.use('/api/', generalLimiter); // Apply general rate limiting to all /api routes


// FIX: REMOVE contactLimiter from here. It will be applied inside contactRoutes.js
app.use('/api/contact', contactRoutes); 


// Handle unknown routes (This should be the LAST route)
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

module.exports = app;