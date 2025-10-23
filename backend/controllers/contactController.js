// /controllers/contactController.js

const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
// ---> 1. UPDATE THIS LINE to include the new function
const { sendContactNotification, sendConfirmationEmail } = require('../utils/emailService');

// Create a new contact message
const createContact = async (req, res) => {
  // ADDED FOR DEBUGGING: This will show you the exact data your server receives.
  console.log('Received request body:', req.body);

  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Log validation errors to the server console for easier debugging
      console.error('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the fields.',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    // Get client IP and User Agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
      ipAddress,
      userAgent
    });

    // Save to database
    const savedContact = await newContact.save();

    // --- FIX APPLIED HERE: Use await Promise.all() ---
    // Wait for both emails to be sent concurrently before responding.
    try {
        await Promise.all([
            sendContactNotification(savedContact), // Notification to admin (you)
            sendConfirmationEmail(savedContact)    // Automated reply to the user
        ]);
        console.log('Both notification and confirmation emails successfully initiated.');
    } catch (emailError) {
        // Log the email error but allow the contact form submission to succeed.
        // The message is saved to the DB, which is the primary goal.
        console.error('One or more emails failed to send:', emailError);
        // You might consider a separate monitoring system for these non-critical failures.
    }
    // --------------------------------------------------

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Thank you for contacting me.',
      data: {
        id: savedContact._id,
        fullName: savedContact.fullName,
        email: savedContact.email,
        subject: savedContact.subject,
        createdAt: savedContact.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


// --- THE REST OF YOUR FILE REMAINS EXACTLY THE SAME ---


// Get all contact messages (for admin use)
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    let query = {};
    if (status && ['new', 'read', 'replied'].includes(status)) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get single contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id).select('-__v');
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact status updated.', data: contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(200).json({ success: true, message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get contact statistics
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([{
      $group: { _id: '$status', count: { $sum: 1 } }
    }]);

    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        today: todayContacts,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
};
