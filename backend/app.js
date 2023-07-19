require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); 
const verifyToken = require('./middleware');
const Soundtrack = require('./models/Soundtrack'); 

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err, origin) => {
  console.error('Caught exception:', err, 'Exception origin:', origin);
});

// Create Express server
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors());

// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Import the Quill Converter class
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');


//routes
app.get('/', function (req, res) {
  res.send('Server is running');
});

app.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        error: 'Email already in use'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//soundtrack
app.get('/api/soundtracks', async (req, res) => {
  try {
    const soundtracks = await Soundtrack.find({});
    console.log('Found soundtracks:', soundtracks);

    // Map over the soundtracks and convert any Quill Delta format descriptions into HTML
    const saveOperations = soundtracks.map(soundtrack => {
      if (soundtrack.description) {
        try {
          // Try parsing the JSON string into an object
          const descriptionObj = JSON.parse(soundtrack.description);
          if (descriptionObj.ops) {
            // console.log('Description ops:', descriptionObj.ops); 
            const converter = new QuillDeltaToHtmlConverter(descriptionObj.ops, {});
            const html = converter.convert();
            // console.log('Converted HTML:', html); 
            // Replace the description with the new HTML
            soundtrack.set('description', html); 
            return soundtrack.save(); // Add this line
          }
        } catch (e) {
          console.error('Error parsing description for soundtrack: ', soundtrack._id, ', error: ', e.message);
          return Promise.resolve(soundtrack); // Return the unmodified soundtrack if there's an error parsing
        }
      }
      return Promise.resolve(soundtrack); // Return a resolved promise if there's no description to convert
    });
    
    const soundtracksWithHtml = await Promise.all(saveOperations);

    res.status(200).json(soundtracksWithHtml);
  } catch (error) {
    console.error('Error fetching soundtracks:', error);
    res.status(500).send('Server error');
  }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
