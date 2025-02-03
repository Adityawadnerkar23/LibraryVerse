const express = require('express');
const router = express.Router();
const md5 = require('md5');
const Register = require('../models/register');

router.post('/post_register', async (req, res) => {
  try {
    const userRegister = req.body;
console.log(userRegister,"Registred")
    const hashedPassword = md5(userRegister.password);

    const newRegister = new Register({
      firstName: userRegister.firstName,
      middleName: userRegister.middleName,
      lastName: userRegister.lastName,
      gender: userRegister.gender,
      email:userRegister.email,
      password: hashedPassword, // hashed password
      phone: userRegister.phone,
      dob: userRegister.dob,
      address: userRegister.address,
    });

    const result = await newRegister.save();
    if (result) {
      return res.status(201).json({ status: 201, message: 'User registered successfully', data: result });
    } else {
      return res.status(400).json({ status: 400, message: 'User registration failed', data: {} });
    }
  } catch (error) {
  }
});

module.exports = router;
