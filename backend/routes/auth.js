const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY'); // replace 'YOUR_SECRET_KEY' with your actual secret key
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ error: 'Email not found' });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY'); // replace 'YOUR_SECRET_KEY' with your actual secret key
      res.send({ token });
    } else {
      return res.status(403).send({ error: 'Invalid password' });
    }
  } catch (error) {
    return res.status(403).send({ error: 'Login failed' });
  }
});

module.exports = router;
