const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

const authRoutes = require('./routes/authRoutes');
const offerRoutes = require('./routes/offerRoutes');
// const conversionRoutes = require('./routes/conversionRoutes');

// app.use('/api/conversions', conversionRoutes);

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Sample API route
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
=======
app.use('/api/auth', authRoutes);
app.use('/api', offerRoutes);
>>>>>>> cc81bec (Display offer data from mysql)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
