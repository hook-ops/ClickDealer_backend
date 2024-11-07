const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Route for user signup
router.post('/signup', authController.signup);

// Route for user login
router.post('/login', authController.login);

router.get('/user', authenticateToken, authController.getUser);

module.exports = router;
