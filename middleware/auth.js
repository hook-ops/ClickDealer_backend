const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extracts token if it exists with "Bearer" prefix
  
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Store the decoded token data in req.user (should contain userId)
    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};

module.exports = authenticateToken;
