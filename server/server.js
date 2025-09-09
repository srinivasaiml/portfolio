const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting - more lenient for testing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // increased limit for testing
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS configuration - more permissive for testing
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://srinivasaiml.github.io',
    'https://profile-1g5.onrender.com',
    /\.onrender\.com$/,
    /\.github\.io$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to contact route
app.use('/api/contact', limiter);

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL || 'mongodb+srv://vasu61078:6JIZtPtc1KwP11Oh@cluster0.wh7wssf.mongodb.net/portfolio';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Don't exit process, continue without DB for now
  }
};

connectDB();

// Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  },
  ip: String,
  userAgent: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Email configuration
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
    pass: process.env.EMAIL_PASS || 'okxjdffhsmmvhsmb'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form submission with enhanced error handling
app.post('/api/contact', async (req, res) => {
  console.log('📧 Contact form submission received');
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);

  try {
    const { name, email, subject, message } = req.body;

    // Enhanced validation
    if (!name || !email || !subject || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }

    // Trim and validate lengths
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.log('❌ Invalid email format:', trimmedEmail);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (trimmedSubject.length < 5 || trimmedSubject.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 5 and 200 characters'
      });
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 2000 characters'
      });
    }

    // Save to database (if connected)
    let contactId = null;
    if (mongoose.connection.readyState === 1) {
      try {
        const newContact = new Contact({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });

        const savedContact = await newContact.save();
        contactId = savedContact._id;
        console.log('✅ Contact saved to database:', contactId);
      } catch (dbError) {
        console.error('❌ Database save error:', dbError);
        // Continue without failing the request
      }
    } else {
      console.log('⚠️ Database not connected, skipping save');
    }

    // Send email notification
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
        to: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
        subject: `🔔 New Contact Form: ${trimmedSubject}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            </div>
            
            <div style="padding: 30px; background: white;">
              <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
                <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${trimmedName}</p>
                <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${trimmedEmail}" style="color: #667eea;">${trimmedEmail}</a></p>
                <p style="margin: 10px 0;"><strong>📝 Subject:</strong> ${trimmedSubject}</p>
                <p style="margin: 10px 0;"><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
                ${contactId ? `<p style="margin: 10px 0;"><strong>🆔 ID:</strong> ${contactId}</p>` : ''}
              </div>
              
              <div style="background: white; padding: 25px; border-left: 4px solid #667eea; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h3 style="color: #333; margin-top: 0;">💬 Message:</h3>
                <p style="line-height: 1.8; color: #555; font-size: 16px; white-space: pre-wrap;">${trimmedMessage}</p>
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 14px; margin: 0;">
                This email was sent from your portfolio contact form<br>
                <strong>Portfolio Backend API</strong> • ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Notification email sent');

      // Send auto-reply to user
      const autoReplyOptions = {
        from: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
        to: trimmedEmail,
        subject: '✅ Thank you for contacting me!',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #667eea; margin-top: 0;">Hi ${trimmedName}! 👋</h2>
              
              <p style="font-size: 16px; line-height: 1.6; color: #555;">
                Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.
              </p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #333;">📋 Your Message Summary:</h3>
                <p style="margin: 10px 0;"><strong>Subject:</strong> ${trimmedSubject}</p>
                <div style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #667eea;">
                  <p style="color: #555; margin: 0; white-space: pre-wrap;">${trimmedMessage}</p>
                </div>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #555;">
                I typically respond within 24-48 hours. In the meantime, feel free to check out my other projects on 
                <a href="https://github.com/srinivasaiml" style="color: #667eea;">GitHub</a> or connect with me on 
                <a href="https://www.linkedin.com/in/patchipala-srinivas-524902256/" style="color: #667eea;">LinkedIn</a>.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="margin: 0; color: #555;">
                  Best regards,<br>
                  <strong style="color: #667eea;">Patchipala Srinivas</strong><br>
                  <span style="color: #888;">Full Stack Developer</span>
                </p>
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                This is an automated response. Please do not reply to this email.<br>
                If you need immediate assistance, please contact me directly at psrinivas9381@gmail.com
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(autoReplyOptions);
      console.log('✅ Auto-reply email sent');

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    // Success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.',
      data: {
        id: contactId,
        timestamp: new Date().toISOString(),
        name: trimmedName,
        email: trimmedEmail
      }
    });

    console.log('✅ Contact form submission completed successfully');

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});

// Get all contacts (for admin use)
app.get('/api/contacts', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-ip -userAgent'); // Hide sensitive data
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const testMail = {
      from: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
      to: process.env.EMAIL_USER || 'patchipalasatish242@gmail.com',
      subject: '🧪 Test Email from Portfolio API',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email sent at ${new Date().toISOString()}</p>
        <p>If you receive this, your email configuration is working correctly!</p>
      `
    };

    await transporter.sendMail(testMail);
    
    res.json({
      success: true,
      message: 'Test email sent successfully!'
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'POST /api/contact',
      'GET /api/contacts',
      'POST /api/test-email'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log(`📧 Email User: ${process.env.EMAIL_USER || 'Not set'}`);
  console.log(`🗄️ MongoDB URL: ${process.env.MONGODB_URL ? 'Set' : 'Not set'}`);
  console.log(`📍 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log(`   GET  http://localhost:${PORT}/api/contacts`);
  console.log(`   POST http://localhost:${PORT}/api/test-email`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});