const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user'); // Import the User model

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret='shcfuewt8w66t863trg32@#234fhbbh';

router.post('/createuser',
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('location').notEmpty().withMessage('Location is required'), 
  async (req, res) => {
  const salt=await bcrypt.genSalt(10);
  let secPassword= await bcrypt.hash(req.body.password,salt)
    try {
    await User.create({
      name:req.body.name,
      password:secPassword,
      email:req.body.email,
      location:req.body.location // Fixed typo in "location"
    })
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: error.message }); // Send error message in response
  }
});


router.post('/loginuser', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch= await bcrypt.compare(req.body.password,userData.password)
    // Compare the passwords
    // const isMatch = password === userData.password;

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const data={
      user:{
        id:ud=userData.id
      }
    }
  const authToken=jwt.sign(data,jwtSecret)
    return res.json({ success: true,authToken:authToken });
  } 


catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;
