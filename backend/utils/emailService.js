// utils/emailService.js

const nodemailer = require('nodemailer');

// Utility function to escape HTML and prevent XSS
const escapeHtml = (text = '') => { // Added default value to prevent errors
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  // Ensure text is a string before replacing
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
};

// --- START: All templates are now at the top ---
const emailTemplates = {
  contactNotification: (contact) => ({
    subject: `New Contact Form Message from ${contact.fullName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4a5568; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f7fafc; padding: 20px; border: 1px solid #e2e8f0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2d3748; }
            .message-box { background-color: white; padding: 15px; border-left: 4px solid #4299e1; margin: 20px 0; }
            .footer { color: #718096; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">From:</span> ${escapeHtml(contact.fullName)}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${contact.email}">${escapeHtml(contact.email)}</a>
              </div>
              <div class="field">
                <span class="label">Subject:</span> ${escapeHtml(contact.subject)}
              </div>
              <div class="message-box">
                <h3 style="margin-top: 0;">Message:</h3>
                <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
              </div>
              <div class="footer">
                <p><em>You can reply directly to this email to respond to ${escapeHtml(contact.email)}.</em></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  userConfirmation: (contact) => ({
    subject: `Thank You for Your Message, ${escapeHtml(contact.firstName)}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #48bb78; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f7fafc; padding: 20px; border: 1px solid #e2e8f0; }
            .message-copy { background-color: white; border-left: 4px solid #48bb78; padding: 15px; margin: 20px 0; }
            .signature { margin-top: 30px; }
            .footer { color: #718096; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Thank You for Reaching Out!</h1>
            </div>
            <div class="content">
              <p>Hi ${escapeHtml(contact.firstName)},</p>
              <p>Thank you for contacting me through my portfolio. This is an automated confirmation to let you know that I've received your message.</p>
              <p>I'll review your message and get back to you as soon as possible, usually within 24-48 hours.</p>
              <div class="message-copy">
                <p><strong>Your Message:</strong></p>
                <p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
                <p>${escapeHtml(contact.message).replace(/\n/g, '<br>')}</p>
              </div>
              <div class="signature">
                <p>Best regards,</p>
                <p><strong>Patchipala Srinivas</strong></p>
              </div>
              <div class="footer">
                <p><small>This is an automated message. Please do not reply to this email. I will respond to you from my personal address.</small></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  })
};
// --- END: All templates are now at the top ---


// --- START: This function creates and verifies the transporter ---
const createTransporter = () => {
  // Validate environment variables
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASS'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    // In a real app, you might want to exit or prevent the app from starting
    // For now, we'll just log the error.
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure is false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.error('Email transporter verification failed:', error);
    } else {
      console.log('Email service is ready to send messages');
    }
  });

  return transporter;
};
// --- END: This function creates and verifies the transporter ---

const transporter = createTransporter();

// Validate contact data
const validateContact = (contact) => {
  // Added firstName to the validation check
  const required = ['firstName', 'fullName', 'email', 'subject', 'message'];
  const missing = required.filter(field => !contact[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required contact fields: ${missing.join(', ')}`);
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email)) {
    throw new Error('Invalid email address');
  }
};


const sendContactNotification = async (contact) => {
  try {
    validateContact(contact);
    
    const template = emailTemplates.contactNotification(contact);
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: contact.email,
      ...template
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('✗ Error sending notification email:', error.message);
    // Do not re-throw error to allow the other email to attempt sending
  }
};


const sendConfirmationEmail = async (contact) => {
  try {
    validateContact(contact);
    
    const template = emailTemplates.userConfirmation(contact);
    const mailOptions = {
      from: `"Patchipala Srinivas" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      ...template
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✓ Confirmation email sent to ${contact.email}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`✗ Error sending confirmation email to ${contact.email}:`, error.message);
    // Do not re-throw error to allow the other email to attempt sending
  }
};

// --- IMPORTANT: This file only exports the two original functions ---
// Your contactController.js is expecting these two names.
module.exports = {
  sendContactNotification,
  sendConfirmationEmail,
};
