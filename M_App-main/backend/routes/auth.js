require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const verifyToken = require('../middleware');

const saltRounds = 10;  // Define the salt rounds for hashing the password.

// Register
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    try {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(201).send({ token });
    } catch (jwtError) {
      console.error(jwtError);
      res.status(500).send({ error: 'Error generating token' });
    }
  } catch (error) {
    if (error.code === 11000) {  // This error code indicates a duplicate key.
      res.status(409).send({ error: 'Email is already in use' }); 
    } else {
      res.status(400).send(error);
    }
  }
});

 

// Login
router.post('/login', async (req, res) => {
  console.log("Login endpoint hit");

  const { email, password } = req.body;

  try {
    console.log(`Attempting to find user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Don't include password in the response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.send({ token, user: userResponse });
    } else {
      return res.status(400).send({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error("An error occurred in the login function: ", error);
    return res.status(400).send({ error: 'Login failed' });
  }
});


router.get('/me', verifyToken, async (req, res) => {
  try {
    console.log("Token: ", req.headers.authorization); // Log the received token

    // Find user with _id provided in token (it's available in req.user after verifyToken middleware)
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Return user data excluding password
    res.json({
      name: user.name,
      location: user.location,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      _id: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
