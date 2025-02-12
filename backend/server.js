const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const addressRoutes = require('./routes/address');
const register = require('./routes/register');
const login = require('./routes/login');
const searchList = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/address', addressRoutes);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/books', searchList);

// Test route to check if the server is working
app.get('/', (req, res) => {
  res.send('Backend is running! 🚀');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app; // For Vercel compatibility
