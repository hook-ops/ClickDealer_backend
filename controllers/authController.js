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
        niche
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
        'INSERT INTO users (accountName, password, firstName, lastName, email, phone, country, city, address, specialization, niche) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [accountName, hashedPassword, firstName, lastName, email, phone, country, city, address, specialization, JSON.stringify(niche)]
      );
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  };

// exports.signup = (req, res) => {
//     try {
//       // Simulate or handle user creation logic
//       console.log('User signup logic...');
      
//       res.status(201).send({ message: 'User signup successful' });
//     } catch (error) {
//       console.error('Error during signup process:', error);
//       // Send detailed error response if needed
//       res.status(500).send({
//         message: 'Internal server error',
//         error: error.message
//       });
//     }
//   };
  

// Login controller
exports.login = async (req, res) => {
    try {
      const { accountName, password } = req.body;
      console.log('Received login data:', req.body);
  
      // Find user by accountName
      const [user] = await db.query('SELECT * FROM users WHERE accountName = ?', [accountName]);
      if (user.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user[0].password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a token
      const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      console.log('Login successful, token generated.');
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  };
