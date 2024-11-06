const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

<<<<<<< HEAD
router.post('/create', offerController.createOffer);
router.get('/list', offerController.listOffer);

module.exports = router;
=======
// Define your routes here
router.get('/offers', offerController.getOffers);
// router.post('/offers', offerController.createOffer);

module.exports = router; // Export the router instance

>>>>>>> cc81bec (Display offer data from mysql)
