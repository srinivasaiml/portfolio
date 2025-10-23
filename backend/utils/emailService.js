const nodemailer = require('nodemailer');

// Email templates
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
    subject: `Thank You for Your Message, ${contact.firstName}!`,
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

// Utility function to escape HTML and prevent XSS
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Validate environment variables
const validateConfig = () => {
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASS'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Create transporter with validation
const createTransporter = () => {
  validateConfig();
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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

const transporter = createTransporter();

// Validate contact data
const validateContact = (contact) => {
  const required = ['fullName', 'email', 'subject', 'message'];
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

/**
 * Sends a notification email to the admin
 * @param {Object} contact - Contact information
 * @param {string} contact.fullName - Full name of sender
 * @param {string} contact.email - Email of sender
 * @param {string} contact.subject - Message subject
 * @param {string} contact.message - Message content
 * @returns {Promise<Object>} Email send result
 */
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
    throw error;
  }
};

/**
 * Sends an automated confirmation email to the user
 * @param {Object} contact - Contact information
 * @param {string} contact.firstName - First name of sender
 * @param {string} contact.email - Email of sender
 * @param {string} contact.subject - Message subject
 * @param {string} contact.message - Message content
 * @returns {Promise<Object>} Email send result
 */
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
    throw error;
  }
};

/**
 * Sends both notification and confirmation emails
 * @param {Object} contact - Contact information
 * @returns {Promise<Object>} Results of both email operations
 */
const sendContactEmails = async (contact) => {
  try {
    const [notificationResult, confirmationResult] = await Promise.allSettled([
      sendContactNotification(contact),
      sendConfirmationEmail(contact)
    ]);

    return {
      notification: notificationResult,
      confirmation: confirmationResult,
      allSuccessful: notificationResult.status === 'fulfilled' && 
                     confirmationResult.status === 'fulfilled'
    };
  } catch (error) {
    console.error('Error in sendContactEmails:', error);
    throw error;
  }
};

module.exports = {
  sendContactNotification,
  sendConfirmationEmail,
  sendContactEmails // Convenience method to send both at once
};