const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = async (req, res) => {
    try {
      const {
        accountName,
        password,
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        address,
        specialization,
        niche,
        accountType
      } = req.body;
  
      console.log('Received data:', req.body);
  
      // Check if the email already exists
      const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database with the hashed password
      await db.query(
        'INSERT INTO users (accountName, password, firstName, lastName, email, phone, country, city, address, specialization, niche, accountType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [accountName, hashedPassword, firstName, lastName, email, phone, country, city, address, specialization, JSON.stringify(niche), accountType]
      );
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

// In authController.js
exports.getUser = async (req, res) => {
    try {
      const userId = req.user.userId; // Ensure this matches the payload structure in your JWT
      const [user] = await db.query('SELECT id, accountName, accountType FROM users WHERE id = ?', [userId]);

      if (user.length > 0) {
        res.json(user[0]); // Sends user info, including accountType
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: 'Server error' });
    }
};
  
// Login controller
exports.login = async (req, res) => {
    try {
      const { accountName, password } = req.body;
      console.log('Received login data:', req.body);
  
      // Find user by accountName
       // Find user by accountName, including accountType field
      const [user] = await db.query(
        'SELECT id, accountName, password, accountType FROM users WHERE accountName = ?', 
        [accountName]
      );

      if (user.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user[0].password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { userId: user[0].id, accountType: user[0].accountType }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
  
      console.log('Login successful, token generated.');
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  };


  // Get user details (protected route)
exports.getUser = async (req, res) => {
  try {
      // Retrieve the user ID from the decoded token
      const userId = req.user.userId;

      const [user] = await db.query(`SELECT * FROM users WHERE id = ?`, [userId]);
      
      if (!user) return res.status(404).json({ message: 'User not found' });

      res.status(200).json( user[0] );
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user' });
  }
};
