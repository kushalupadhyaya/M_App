require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.header('Authorization');
  if (!bearerHeader) return res.status(401).send('Access Denied');

  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);  // JWT_URI changed to JWT_SECRET
    req.user = verified;
    next();
  } catch(err) {
    res.status(400).send('Invalid Token');
  }
}


module.exports = verifyToken;
