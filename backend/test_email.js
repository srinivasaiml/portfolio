require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing email transport configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'Not Set');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function main() {
  try {
    console.log('Verifying connection config...');
    await transporter.verify();
    console.log('✓ SMTP server connection verified successfully!');
    
    console.log('Attempting to send test email...');
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test email from Portfolio Backend",
      text: "If you receive this, the email configuration is working perfectly!",
    });
    console.log('✓ Email sent successfully! MessageId:', info.messageId);
  } catch (error) {
    console.error('✗ Email test failed:', error);
  }
}

main();
