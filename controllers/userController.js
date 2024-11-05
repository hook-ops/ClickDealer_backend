const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO Users (name, email, role, status, registration_date, referral_id) VALUES (?, ?, ?, ?, NOW(), ?)',
      [name, email, role, 'pending', null]
    );

    res.status(201).send({ userId: result.insertId });
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (!user.length) return res.status(400).send('User not found');

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ userId: user[0].user_id, role: user[0].role }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};
