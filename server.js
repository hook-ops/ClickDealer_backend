const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Sample API route
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
