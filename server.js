const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const offerRoutes = require('./routes/offerRoutes');

const authRoutes = require('./routes/authRoutes');

// const conversionRoutes = require('./routes/conversionRoutes');

// app.use('/api/conversions', conversionRoutes);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', offerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
