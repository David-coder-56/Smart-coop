// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require("./routes/auth");

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS: allow your client URL. Use CLIENT_URL in your .env
const clientUrl = process.env.CLIENT_URL || "http://localhost:5500";
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5500',
  credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);

// Optional logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logged out' });
});

// Example protected route (just returns userId)
const authMiddleware = require('./middleware/auth');
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ msg: 'Welcome to dashboard', userId: req.userId });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Serve frontend (optional) — make sure 'public' contains built frontend if you want this
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
