require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

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
  console.log("Login endpoint hit"); // Added log

  const { email, password } = req.body;
  
  try {
    console.log(`Attempting to find user with email: ${email}`); // Added log
    const user = await User.findOne({ email });
    console.log(`User found: ${user}`); // Added log

    if (!user) {
      return res.status(404).send({ error: 'Email not found' });
    }

    console.log(`Stored hashed password: ${user.password}`); 

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(`Result of bcrypt.compare: ${isMatch}`); 

    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET); 
      res.send({ token });
    } else {
      return res.status(403).send({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error("An error occurred in the login function: ", error);  // Added log
    return res.status(403).send({ error: 'Login failed' });
  }  
});



module.exports = router;
