# Portfolio Backend Server

This is the backend server for the portfolio contact form.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with the following variables:
   ```
   MONGODB_URL=mongodb+srv://vasu61078:6JIZtPtc1KwP11Oh@cluster0.wh7wssf.mongodb.net/portfolio
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=https://profile-1g5.onrender.com
   EMAIL_USER=patchipalasatish242@gmail.com
   EMAIL_PASS=okxjdffhsmmvhsmb
   ```

3. **Run the Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

- `GET /` - Health check
- `GET /api/health` - Detailed health status
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)

## Features

- ✅ MongoDB Atlas integration
- ✅ Email notifications with Nodemailer
- ✅ Auto-reply to users
- ✅ Rate limiting (10 requests per 15 minutes)
- ✅ CORS configuration
- ✅ Input validation
- ✅ Security headers with Helmet
- ✅ Error handling
- ✅ Database storage of all messages

## Deployment on Render

1. Connect your GitHub repository to Render
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Add all environment variables in Render dashboard
5. Deploy!

## Testing

You can test the API using curl:

```bash
curl -X POST https://your-render-url.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```