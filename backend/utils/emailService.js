const nodemailer = require('nodemailer');

// (Your transporter and console.log checks are here...)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // This should be the password WITHOUT spaces
  },
});

/**
 * Sends a notification email TO YOU (the admin).
 */
const sendContactNotification = async (contact) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${contact.fullName}`,
    replyTo: contact.email,
    html: `
      <h1>New Message via Portfolio Contact Form</h1>
      <p><strong>Name:</strong> ${contact.fullName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <hr>
      <h3>Message:</h3>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><i>You can reply directly to this email to respond to ${contact.email}.</i></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully!');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};


// ---> ADD THIS NEW FUNCTION <---
/**
 * Sends an automated confirmation email TO THE USER.
 * @param {object} contact - The contact object with the user's details.
 */
const sendConfirmationEmail = async (contact) => {
  const mailOptions = {
    from: `"Patchipala Srinivas" <${process.env.EMAIL_USER}>`, // Change "Your Name or Brand"
    to: contact.email, // Send it to the person who filled out the form
    subject: `Thank You for Your Message, ${contact.firstName}!`,
    html: `
      <h1>Thank You for Reaching Out!</h1>
      <p>Hi ${contact.firstName},</p>
      <p>This is an automated confirmation to let you know that I've received your message. I'll review it and get back to you as soon as possible (usually within 24-48 hours).</p>
      <p>For your records, here is a copy of your message:</p>
      <div style="background-color: #f4f4f4; border-left: 4px solid #ccc; padding: 10px; margin: 20px 0;">
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
      </div>
      <p>Best regards,</p>
      <p><strong>P Srinivas</strong></p>
      <br>
      <p><small>Please do not reply to this automated email. I will respond to you from my personal address.</small></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent successfully to ${contact.email}!`);
  } catch (error) {
    console.error(`Error sending confirmation email to ${contact.email}:`, error);
  }
};


// ---> UPDATE YOUR EXPORTS <---
module.exports = {
  sendContactNotification,
  sendConfirmationEmail // Add the new function here
};