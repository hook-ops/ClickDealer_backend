const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Offer creation route with image upload and authentication
router.post('/offers/create', authenticateToken, upload.single('image'), (req, res) => {
    // Check if the user is an advertiser before creating the offer
    if (req.user.accountType === 'advertiser') {
        return offerController.createOffer(req, res);
    } else {
        return res.status(403).send('Only advertisers can post offers');
    }
});

// Get all offers (assuming no authentication required)
router.get('/offers/get', offerController.getOffers);

router.post('/offers/apply', authenticateToken, offerController.applyForOffer);
// Route for advertisers to accept or reject an application
router.post('/offers/application/update', authenticateToken, offerController.updateApplicationStatus);

module.exports = router;
