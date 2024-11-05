const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Sample API route
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
