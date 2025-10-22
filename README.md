# Patchipala Srinivas Portfolio

A modern, full-stack portfolio website showcasing my projects, skills, and experience as a developer. Built with React, TypeScript, Tailwind CSS for the frontend and Node.js, Express, MongoDB for the backend.

## 🏗️ Project Structure

```
portfolio/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.tsx          # Main App component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Tailwind and global styles
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.ts       # Vite configuration
├── backend/                 # Node.js backend API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
└── README.md                # This file
```

## ✨ Features

### Frontend
- 🎨 **Modern UI** – Clean, responsive, and animated design
- 🖥️ **Project Showcase** – Filterable, animated project cards with live links
- 📱 **Mobile Friendly** – Fully responsive for all devices
- ⚡ **Fast Build** – Powered by Vite for instant loading
- 🛠️ **Tech Stack Badges** – See the technologies used in each project
- 🌙 **Smooth Animations** – Framer Motion powered animations
- 📨 **Contact Form** – Integrated with backend API

### Backend
- ✅ **Contact Form API** – Handle form submissions
- ✅ **MongoDB Integration** – Store contact messages
- ✅ **Input Validation** – Comprehensive validation and sanitization
- ✅ **Rate Limiting** – Security against spam
- ✅ **Email Notifications** – Automated email responses
- ✅ **CORS Configuration** – Secure cross-origin requests
- ✅ **Error Handling** – Robust error management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be running at [http://localhost:5173](http://localhost:5173)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install

   npm install nodemailer
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   # MongoDB Connection
   MONGODB_URL=mongodb://localhost:27017/portfolio

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS Configuration
   FRONTEND_URL=http://localhost:5173

   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start MongoDB:**
   ```bash
   # For local MongoDB
   mongod

   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Start the backend server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```
   The backend will be running at [http://localhost:5000](http://localhost:5000)

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite
- **3D Graphics:** Three.js + React Three Fiber

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Validation:** Express Validator
- **Security:** Helmet, CORS, Rate Limiting
- **Email:** Nodemailer

## 📡 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all messages (admin)
- **GET** `/api/contact/stats` - Get contact statistics
- **GET** `/api/contact/:id` - Get specific message
- **PATCH** `/api/contact/:id/status` - Update message status
- **DELETE** `/api/contact/:id` - Delete message

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `dist` folder to your preferred platform

### Backend (Railway/Heroku/DigitalOcean)
1. Set environment variables on your hosting platform
2. Deploy the backend directory
3. Update the frontend API endpoints to point to your deployed backend

### Environment Variables for Production
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-portfolio-domain.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🔧 Development

### Running Both Frontend and Backend
You can run both simultaneously using two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
```

The frontend is configured to proxy API requests to the backend during development.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📞 Support

For support, open an issue on GitHub or contact me via the contact form on the portfolio.

## 🙏 Acknowledgments
- UI inspiration from modern developer portfolios
- Icons from Lucide React
- Animations from Framer Motion
- Images from Unsplash and Pexels