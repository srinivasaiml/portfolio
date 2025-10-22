const nodemailer = require('nodemailer');

/**
 * Email Service Configuration
 * Handles all email operations for the portfolio contact form
 */

// Validate required environment variables
const validateConfig = () => {
  const required = ['EMAIL_USER', 'EMAIL_PASS'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Initialize transporter with error handling
const createTransporter = () => {
  try {
    validateConfig();
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.trim(), // Trim whitespace
      },
    });

    // Verify connection on startup
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
      } else {
        console.log('✅ Email service is ready');
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw error;
  }
};

const transporter = createTransporter();

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
const sanitizeHtml = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');
};

/**
 * Validates contact form data
 * @param {object} contact - Contact form data
 * @throws {Error} If validation fails
 */
const validateContact = (contact) => {
  const required = ['fullName', 'email', 'subject', 'message'];
  const missing = required.filter(field => !contact[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contact.email)) {
    throw new Error('Invalid email address');
  }
};

/**
 * Generates admin notification email template
 * @param {object} contact - Contact form data
 * @returns {string} HTML email template
 */
const getAdminEmailTemplate = (contact) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f6f9;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 24px;">📬 New Contact Form Message</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #333;">${sanitizeHtml(contact.fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #333;">
              <a href="mailto:${contact.email}" style="color: #667eea; text-decoration: none;">${sanitizeHtml(contact.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0; color: #333;">${sanitizeHtml(contact.subject)}</td>
          </tr>
        </table>
      </div>

      <div style="background: #fff; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">Message:</h3>
        <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${sanitizeHtml(contact.message)}</p>
      </div>

      <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">💡 Reply directly to respond to this message</p>
        <a href="mailto:${contact.email}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">Reply Now</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0; color: #999; font-size: 12px;">
        Sent from Portfolio Contact Form • ${new Date().toLocaleString()}
      </p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Generates user confirmation email template
 * @param {object} contact - Contact form data
 * @returns {string} HTML email template
 */
const getUserEmailTemplate = (contact) => {
  const firstName = contact.fullName.split(' ')[0];
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f6f9;">
  <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 24px;">✨ Thank You for Reaching Out!</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
        Hi <strong>${sanitizeHtml(firstName)}</strong>,
      </p>
      
      <p style="margin: 0 0 20px 0; color: #555; font-size: 15px; line-height: 1.6;">
        Thank you for your message! This is an automated confirmation to let you know I've received your inquiry. 
        I'll review it carefully and get back to you as soon as possible, typically within <strong>24-48 hours</strong>.
      </p>

      <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">📝 Your Message Summary</h3>
        <div style="background: white; border-left: 4px solid #667eea; padding: 15px; border-radius: 4px;">
          <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
            <strong>Subject:</strong> ${sanitizeHtml(contact.subject)}
          </p>
          <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${sanitizeHtml(contact.message)}</p>
        </div>
      </div>

      <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; margin: 25px 0;">
        <p style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: bold;">Looking forward to connecting with you!</p>
        <p style="margin: 0; color: #666; font-size: 14px;">I appreciate your interest and will be in touch soon.</p>
      </div>

      <div style="border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 25px;">
        <p style="margin: 0 0 10px 0; color: #333; font-weight: bold; font-size: 15px;">Best regards,</p>
        <p style="margin: 0; color: #667eea; font-size: 16px; font-weight: bold;">Patchipala Srinivas</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0 0 5px 0; color: #999; font-size: 12px;">
        ⚠️ This is an automated message. Please do not reply to this email.
      </p>
      <p style="margin: 0; color: #999; font-size: 12px;">
        I will respond to you from my personal email address.
      </p>
    </div>
  </div>
</body>
</html>
`;
};

/**
 * Sends admin notification email
 * @param {object} contact - Contact form data
 * @returns {Promise<object>} Email send result
 */
const sendContactNotification = async (contact) => {
  try {
    validateContact(contact);

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Message from ${contact.fullName}`,
      replyTo: contact.email,
      html: getAdminEmailTemplate(contact),
      // Plain text fallback
      text: `
New Contact Form Message

From: ${contact.fullName}
Email: ${contact.email}
Subject: ${contact.subject}

Message:
${contact.message}

Reply to: ${contact.email}
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin notification:', error.message);
    throw error;
  }
};

/**
 * Sends confirmation email to user
 * @param {object} contact - Contact form data
 * @returns {Promise<object>} Email send result
 */
const sendConfirmationEmail = async (contact) => {
  try {
    validateContact(contact);

    const mailOptions = {
      from: `"Patchipala Srinivas" <${process.env.EMAIL_USER}>`,
      to: contact.email,
      subject: `Thank You for Your Message, ${contact.fullName.split(' ')[0]}!`,
      html: getUserEmailTemplate(contact),
      // Plain text fallback
      text: `
Hi ${contact.fullName.split(' ')[0]},

Thank you for your message! This is an automated confirmation to let you know I've received your inquiry.

I'll review it carefully and get back to you as soon as possible, typically within 24-48 hours.

Your Message Summary:
Subject: ${contact.subject}
Message: ${contact.message}

Best regards,
Patchipala Srinivas

---
This is an automated message. Please do not reply to this email.
I will respond to you from my personal email address.
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation sent to ${contact.email}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Error sending confirmation to ${contact.email}:`, error.message);
    throw error;
  }
};

/**
 * Sends both notification and confirmation emails
 * @param {object} contact - Contact form data
 * @returns {Promise<object>} Combined results
 */
const sendContactEmails = async (contact) => {
  try {
    const [adminResult, userResult] = await Promise.allSettled([
      sendContactNotification(contact),
      sendConfirmationEmail(contact),
    ]);

    return {
      admin: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason },
      user: userResult.status === 'fulfilled' ? userResult.value : { success: false, error: userResult.reason },
    };
  } catch (error) {
    console.error('❌ Error sending contact emails:', error.message);
    throw error;
  }
};

module.exports = {
  sendContactNotification,
  sendConfirmationEmail,
  sendContactEmails, // Send both emails at once
  validateContact,
  transporter, // Export for testing if needed
};