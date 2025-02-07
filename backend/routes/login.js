const express = require('express');
const Register = require('../models/register');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Middleware to validate credentials
const validateCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 400, message: 'Email and password are required' });
  }
  console.log("validateCredentials on");
  next();
};

// Logger middleware to log request details
const logger = (req, res, next) => {
  req.time = new Date().toISOString();
  console.log(`[${req.time}] ${req.method} request from ${req.ip} to ${req.hostname}${req.path}`);
  next();
};

// Use environment variable for JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// Login Route
router.post('/post_log', validateCredentials, logger, async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = md5(password);
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }

    if (hashedPassword !== user.password) {
      return res.status(401).json({ status: 401, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ status: 200, message: 'Login successful', data: user, token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
});

module.exports = router;
