require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const verifyToken = require('../middleware');

//validate session middleware

function validateSession(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).send('User not found');
      }

      if (user.currentSessionToken !== token) {
        return res.status(401).send('Token does not match active session');
      }

      req.user = user;  // Store user info in the request object
      next();
    });
  });
}


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const user = new User({ name, email, password });
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
// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Update the user's currentSessionToken in the database
      try {
        const updatedUser = await User.findByIdAndUpdate(user._id, { currentSessionToken: token }, { new: true });
        
        // Don't include password in the response
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.send({ token, user: userResponse });
      } catch (err) {
        console.error("Error updating user's session token:", err);
        return res.status(500).send({ error: 'Error updating session token' });
      }
    } else {
      return res.status(400).send({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error("An error occurred in the login function: ", error);
    return res.status(400).send({ error: 'Login failed' });
  }
});


router.get('/me', verifyToken, validateSession, async (req, res) => {
  try {
    // Find user with _id provided in token (it's available in req.user after verifyToken middleware)
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Return user data excluding password
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
