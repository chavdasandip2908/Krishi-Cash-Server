// src/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');
const userRoutes = require('./routes/userRoutes');
const cropsRouter = require('./routes/cropsRouter');
const cropIncomeRouter = require('./routes/cropIncomeRouter');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const secretKey = process.env.TOKEN_SECRET_KEY;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

function authenticateToken(req, res, next) {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // If no token provided, return 401 Unauthorized
  // if (!token) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  // Verify token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' ,code:'INVALID_TOKEN' });
    }
    // If token is valid, set decoded token data to the request object
    req.user = decoded;
    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  // If token is valid, return some protected data
  res.json({ message: 'Protected data accessed successfully', user: req.user.userId });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/crops', authenticateToken, cropsRouter);
app.use('/api/cropincomes', authenticateToken, cropIncomeRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
