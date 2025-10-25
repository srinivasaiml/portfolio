// utils/emailService.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Modern email template styles
 */
const getEmailStyles = () => `
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }
    .email-card {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .email-logo {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: bold;
      backdrop-filter: blur(10px);
      border: 3px solid rgba(255, 255, 255, 0.3);
    }
    .email-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .email-body {
      padding: 40px 30px;
    }
    .info-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .info-row {
      display: table;
      width: 100%;
      margin: 12px 0;
    }
    .info-label {
      font-weight: 600;
      color: #667eea;
      display: inline-block;
      min-width: 100px;
    }
    .info-value {
      color: #333333;
      display: inline-block;
    }
    .message-box {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border: 2px solid #e9ecef;
      position: relative;
    }
    .message-box::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 60px;
      color: #667eea;
      opacity: 0.2;
    }
    .message-box h3 {
      margin: 0 0 15px 0;
      color: #667eea;
      font-size: 18px;
    }
    .message-content {
      color: #495057;
      font-size: 15px;
      line-height: 1.8;
    }
    .greeting {
      font-size: 18px;
      color: #333333;
      margin-bottom: 20px;
    }
    .highlight {
      background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #667eea, transparent);
      margin: 30px 0;
      border: none;
    }
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 3px solid #667eea;
    }
    .footer p {
      margin: 8px 0;
      color: #6c757d;
      font-size: 14px;
    }
    .signature {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      margin-top: 20px;
    }
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 15px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 600;
      margin-top: 20px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 8px;
      vertical-align: middle;
    }
  </style>
`;

/**
 * Admin notification template
 */
const getAdminNotificationTemplate = (contact) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${getEmailStyles()}
  </head>
  <body>
    <div class="email-container">
      <div class="email-card">
        <div class="email-header">
          <div class="email-logo">📧</div>
          <h1>New Portfolio Message</h1>
          <div class="badge">Admin Notification</div>
        </div>
        
        <div class="email-body">
          <p class="greeting">
            🎉 You've received a new message through your portfolio!
          </p>
          
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">👤 Name:</span>
              <span class="info-value">${contact.fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email:</span>
              <span class="info-value">${contact.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📝 Subject:</span>
              <span class="info-value">${contact.subject}</span>
            </div>
          </div>

          <div class="message-box">
            <h3>💬 Message Content:</h3>
            <div class="message-content">
              ${contact.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <hr class="divider">
          
          <p style="text-align: center; color: #6c757d; font-size: 14px;">
            💡 <strong>Tip:</strong> Click "Reply" in your email client to respond directly to <span class="highlight">${contact.fullName}</span>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Portfolio Contact System</strong></p>
          <p>Received: ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

/**
 * User confirmation template
 */
const getUserConfirmationTemplate = (contact) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${getEmailStyles()}
  </head>
  <body>
    <div class="email-container">
      <div class="email-card">
        <div class="email-header">
          <div class="email-logo">✓</div>
          <h1>Message Received!</h1>
          <div class="badge">Confirmation</div>
        </div>
        
        <div class="email-body">
          <p class="greeting">
            Hi <span class="highlight">${contact.firstName}</span>,
          </p>
          
          <p style="font-size: 16px; color: #495057;">
            Thank you for reaching out! 🎉 I wanted to let you know that I've successfully received your message and I'm excited to read it.
          </p>

          <div class="info-card">
            <div class="info-row">
              <span class="info-label">📋 Your Subject:</span>
              <span class="info-value">${contact.subject}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📅 Submitted:</span>
              <span class="info-value">${new Date().toLocaleString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          <div class="message-box">
            <h3>📨 What happens next?</h3>
            <div class="message-content">
              <p>✓ I'll review your message carefully</p>
              <p>✓ You'll hear back from me within <strong>24-48 hours</strong></p>
              <p>✓ I'll respond from my personal email address</p>
            </div>
          </div>

          <hr class="divider">

          <p style="text-align: center; color: #495057; font-size: 15px;">
            I appreciate you taking the time to connect. Looking forward to our conversation!
          </p>

          <p class="signature" style="text-align: center;">
            Best regards,<br>
            <span class="highlight">P Srinivas</span>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Patchipala Srinivas</strong></p>
          <p>Portfolio • ${process.env.EMAIL_USER || 'Contact'}</p>
          <p style="font-size: 12px; color: #adb5bd; margin-top: 15px;">
            ⚡ This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

/**
 * Sends a notification email to YOU (the admin)
 */
const sendContactNotification = async (contact) => {
  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.EMAIL_USER,
      subject: `🔔 New Portfolio Message from ${contact.fullName}`,
      replyTo: contact.email,
      html: getAdminNotificationTemplate(contact),
    });

    console.log('✓ Notification email sent successfully via Resend!');
  } catch (error) {
    console.error('✗ Error sending notification email via Resend:', error);
    throw error;
  }
};

/**
 * Sends an automated confirmation email TO THE USER
 */
const sendConfirmationEmail = async (contact) => {
  try {
    await resend.emails.send({
      from: 'Patchipala Srinivas <onboarding@resend.dev>',
      to: contact.email,
      subject: `✓ Message Received - Thank You, ${contact.firstName}!`,
      html: getUserConfirmationTemplate(contact),
    });

    console.log(`✓ Confirmation email sent to ${contact.email} via Resend!`);
  } catch (error) {
    console.error(`✗ Error sending confirmation email to ${contact.email} via Resend:`, error);
    throw error;
  }
};

module.exports = {
  sendContactNotification,
  sendConfirmationEmail,
};