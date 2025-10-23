const rateLimit = require('express-rate-limit');

const FIFTEEN_MINUTES_IN_MS = 15 * 60 * 1000;

// Rate limiter for contact form submissions
const contactLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_IN_MS, // CORRECTED: Was 1, now 15 minutes
  max:10, // Limit each IP to 5 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many contact form submissions from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES_IN_MS, // CORRECTED: Was 1, now 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  contactLimiter,
  generalLimiter
};