require('dotenv').config();

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err, origin) => {
  console.error('Caught exception:', err, 'Exception origin:', origin);
});

const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoURI = process.env.MONGO_URI;
const MongoDBStore = require('connect-mongodb-session')(session);

// Create Express server
const app = express();


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(cors());

// Connection to MongoDB
//mongo connection

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Other options if needed
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start your application or perform any operations after connecting
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  //Mongo DB Session
  const store = new MongoDBStore({
    uri: mongoURI, // replace this with your MongoDB connection string
    collection: 'userSessions'
  });


  app.get('/', function (req, res) {
    res.send('Server is running');
  });

  app.post('/api/auth/register', async (req, res) => {
    // Get the email from the request body
    const { email } = req.body;
  
    try {
      // Check if the email is already in the database
      const user = await User.findOne({ email });
      
      if (user) {
        // If the email is already in use, send an error message
        return res.status(400).json({
          error: 'Email already in use'
        });
      }
  
      // If the email is not in use, continue with registration process
      // ...
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
