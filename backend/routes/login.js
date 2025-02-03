const express = require('express');
const Register = require('../models/register');
const md5 = require('md5');
const jwt = require('jsonwebtoken'); // Add this line to require jsonwebtoken

const router = express.Router();

const validateCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) 
  {return res.status(400).json({ status: 400, message: 'Email and password required' });}
  next();
  console.log(validateCredentials, "on");
};

const logger = (req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
};

// Add a secret key for JWT signing
const JWT_SECRET = 'your_secret_key_here'; // Replace with a secure string

router.post('/post_log', validateCredentials, logger, async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);
    const checkuser = await Register.findOne({ email });
    if (checkuser) {
      if (password === checkuser.password) {
        // Generate a JWT token
        const payload = {
          userId: checkuser._id,
          username: checkuser.username,
          email: checkuser.email,
        };
        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: '1h', // token expires in 1 hour
        });

        return res.status(200).json({ status: 200, message: 'log in success', data: checkuser, token });
      } else {
        return res.status(401).json({ status: 401, message: 'user not exist' });
      }
    } else {
      return res.status(404).json({ status: 404, message: 'user not found' });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
});

////////api creation/////////
module.exports = router;