const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// const authenticateToken = require('./middleware/auth'); // Import the authentication middleware
const offerRoutes = require('./routes/offerRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Public route for authentication
app.use('/uploads', express.static('uploads'));
app.use('/api', offerRoutes);
// Protect routes under /api with the authenticateToken middleware
// app.use('/api', authenticateToken, offerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
