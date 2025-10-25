// utils/emailService.js

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Ultra-modern email template with animations and effects
 */
const getEmailStyles = () => `
  <style>
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background: #f0f2f5;
    }

    .email-container {
      max-width: 650px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      background-size: 200% 200%;
      animation: gradientShift 15s ease infinite;
      padding: 50px 20px;
    }

    .email-card {
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      animation: fadeInUp 0.8s ease-out;
      position: relative;
    }

    .email-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 3s infinite;
    }

    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 50px 40px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }

    .email-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite;
    }

    .email-logo {
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      margin: 0 auto 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      backdrop-filter: blur(20px);
      border: 4px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
      animation: pulse 3s ease-in-out infinite;
      position: relative;
      z-index: 1;
    }

    .email-header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      letter-spacing: -0.5px;
      animation: fadeIn 1s ease-out 0.3s both;
      position: relative;
      z-index: 1;
    }

    .email-body {
      padding: 50px 40px;
      animation: fadeIn 1s ease-out 0.5s both;
    }

    .info-card {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 16px;
      padding: 30px;
      margin: 30px 0;
      border-left: 6px solid #667eea;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
      animation: slideInRight 0.8s ease-out 0.7s both;
      position: relative;
      overflow: hidden;
    }

    .info-card::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      border-radius: 50%;
    }

    .info-row {
      display: table;
      width: 100%;
      margin: 16px 0;
      animation: slideInRight 0.6s ease-out both;
    }

    .info-row:nth-child(1) { animation-delay: 0.8s; }
    .info-row:nth-child(2) { animation-delay: 0.9s; }
    .info-row:nth-child(3) { animation-delay: 1s; }

    .info-label {
      font-weight: 700;
      color: #667eea;
      display: inline-block;
      min-width: 120px;
      font-size: 15px;
    }

    .info-value {
      color: #333333;
      display: inline-block;
      font-size: 15px;
      font-weight: 500;
    }

    .message-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 16px;
      padding: 35px;
      margin: 35px 0;
      border: 3px solid #e9ecef;
      position: relative;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      animation: fadeInUp 0.8s ease-out 1.1s both;
    }

    .message-box::before {
      content: '"';
      position: absolute;
      top: -15px;
      left: 25px;
      font-size: 80px;
      color: #667eea;
      opacity: 0.15;
      font-family: Georgia, serif;
    }

    .message-box h3 {
      margin: 0 0 20px 0;
      color: #667eea;
      font-size: 20px;
      font-weight: 700;
    }

    .message-content {
      color: #495057;
      font-size: 16px;
      line-height: 1.9;
    }

    .message-content p {
      margin: 12px 0;
      padding-left: 25px;
      position: relative;
    }

    .message-content p::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #667eea;
      font-size: 24px;
      line-height: 16px;
    }

    .greeting {
      font-size: 20px;
      color: #333333;
      margin-bottom: 25px;
      font-weight: 600;
      animation: fadeIn 0.8s ease-out 0.6s both;
    }

    .highlight {
      background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }

    .divider {
      height: 3px;
      background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
      margin: 40px 0;
      border: none;
      animation: fadeIn 1s ease-out 1.2s both;
    }

    .footer {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 40px;
      text-align: center;
      border-top: 4px solid transparent;
      border-image: linear-gradient(90deg, #667eea, #764ba2) 1;
      animation: fadeIn 1s ease-out 1.3s both;
    }

    .footer p {
      margin: 10px 0;
      color: #6c757d;
      font-size: 15px;
    }

    .signature {
      font-size: 20px;
      font-weight: 700;
      color: #333333;
      margin-top: 30px;
      animation: fadeInUp 0.8s ease-out 1.4s both;
    }

    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 20px;
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      animation: fadeIn 1s ease-out 0.4s both, pulse 3s ease-in-out 2s infinite;
      position: relative;
      z-index: 1;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 40px;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 16px;
      margin-top: 25px;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
      transition: all 0.3s ease;
      animation: fadeInUp 0.8s ease-out 1.5s both;
    }

    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 8px;
      vertical-align: middle;
    }

    .sparkle {
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }

    .success-indicator {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      box-shadow: 0 15px 40px rgba(72, 187, 120, 0.4);
      animation: pulse 2s ease-in-out infinite;
    }

    .checklist-item {
      background: white;
      padding: 15px 20px;
      border-radius: 12px;
      margin: 12px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-left: 4px solid #48bb78;
      animation: slideInRight 0.6s ease-out both;
    }

    .checklist-item:nth-child(1) { animation-delay: 1.2s; }
    .checklist-item:nth-child(2) { animation-delay: 1.3s; }
    .checklist-item:nth-child(3) { animation-delay: 1.4s; }

    @media only screen and (max-width: 600px) {
      .email-container {
        padding: 30px 15px;
      }
      .email-body {
        padding: 30px 25px;
      }
      .email-header {
        padding: 40px 25px;
      }
      .info-card, .message-box {
        padding: 25px 20px;
      }
    }
  </style>
`;

/**
 * Enhanced admin notification template
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
            <span class="sparkle">🎉</span> You've received a new message through your portfolio!
          </p>
          
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">👤 Name:</span>
              <span class="info-value"><strong>${contact.fullName}</strong></span>
            </div>
            <div class="info-row">
              <span class="info-label">📧 Email:</span>
              <span class="info-value">${contact.email}</span>
            </div>
            <div class="info-row">
              <span class="info-label">📝 Subject:</span>
              <span class="info-value"><strong>${contact.subject}</strong></span>
            </div>
          </div>

          <div class="message-box">
            <h3>💬 Message Content</h3>
            <div class="message-content">
              ${contact.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <hr class="divider">
          
          <p style="text-align: center; color: #495057; font-size: 16px; font-weight: 500;">
            💡 <strong>Quick Tip:</strong> Click "Reply" in your email client to respond directly to <span class="highlight">${contact.fullName}</span>
          </p>
        </div>
        
        <div class="footer">
          <p style="font-weight: 700; font-size: 18px; color: #333;">Portfolio Contact System</p>
          <p style="font-size: 14px;"><strong>Received:</strong> ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p style="font-size: 13px; color: #adb5bd; margin-top: 20px;">
            ⚡ Powered by Resend Email Service
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

/**
 * Enhanced user confirmation template
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
          <div class="success-indicator">✓</div>
          <h1>Message Received Successfully!</h1>
          <div class="badge">Confirmation</div>
        </div>
        
        <div class="email-body">
          <p class="greeting">
            Hi <span class="highlight">${contact.firstName}</span>,
          </p>
          
          <p style="font-size: 17px; color: #495057; line-height: 1.8; margin-bottom: 30px;">
            Thank you so much for reaching out! <span class="sparkle">🎉</span> I wanted to let you know that I've successfully received your message and I'm genuinely excited to read it.
          </p>

          <div class="info-card">
            <div class="info-row">
              <span class="info-label">📋 Your Subject:</span>
              <span class="info-value"><strong>${contact.subject}</strong></span>
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
            <div class="info-row">
              <span class="info-label">📬 Status:</span>
              <span class="info-value"><strong style="color: #48bb78;">✓ Delivered Successfully</strong></span>
            </div>
          </div>

          <div class="message-box">
            <h3>📨 What Happens Next?</h3>
            <div class="message-content">
              <div class="checklist-item">
                <strong style="color: #48bb78;">✓</strong> I'll review your message carefully and thoughtfully
              </div>
              <div class="checklist-item">
                <strong style="color: #48bb78;">✓</strong> You'll hear back from me within <strong>24-48 hours</strong>
              </div>
              <div class="checklist-item">
                <strong style="color: #48bb78;">✓</strong> I'll respond from my personal email address
              </div>
            </div>
          </div>

          <hr class="divider">

          <p style="text-align: center; color: #495057; font-size: 17px; line-height: 1.8; font-weight: 500;">
            I truly appreciate you taking the time to connect with me. <br>
            Looking forward to our conversation! <span class="sparkle">✨</span>
          </p>

          <p class="signature" style="text-align: center;">
            Best regards,<br>
            <span class="highlight">P Srinivas</span>
          </p>
        </div>
        
        <div class="footer">
          <p style="font-weight: 700; font-size: 18px; color: #333;">Patchipala Srinivas</p>
          <p style="font-size: 14px;">Full Stack Developer & Portfolio Owner</p>
          <p style="font-size: 14px; margin-top: 5px;">${process.env.EMAIL_USER || 'Contact via Portfolio'}</p>
          <p style="font-size: 12px; color: #adb5bd; margin-top: 20px;">
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
