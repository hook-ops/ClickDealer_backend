const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// exports.createOffer = async (req, res) => {
//     try {
//         const { name, price_format, payout, allowed_countries, vertical, platform } = req.body;
//         const [result] = await db.query(
//             'INSERT INTO Offers (name, price_format, payout, allowed_countries, vertical, platform, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
//             [name, price_format, payout, JSON.stringify(allowed_countries), vertical, JSON.stringify(platform)]
//         );
//         res.status(200).send({ result: result });
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Error creating offer');
//     }
// };

// exports.listOffer = async (req, res) => {
//     try {
//         const [offers] = await db.query('SELECT * FROM offers');
//         res.send({ result: offers})
//     } catch (err) {
//         res.status(500).send('Error listing offer');
//     }
// }
// offerController.js

// const db = require('../config/db');

exports.createOffer = async (req, res) => {
    const { accountType } = req.user;
    if (accountType !== 'advertiser') {
        return res.status(403).json({ message: 'Only advertisers can post offers' });
      }
    const {
        name, price_format, payout, allowed_countries, vertical, platform,
        status, flow, loyalty, description, tracking_type, allowed_media,
        restrictions, geo_target, creative, s2s_postback_url
    } = req.body;

    try {
        await db.query(
            `INSERT INTO offers (name, price_format, payout, allowed_countries, vertical, platform, 
            status, flow, loyalty, description, tracking_type, allowed_media, restrictions, 
            geo_target, creative, s2s_postback_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, price_format, payout, allowed_countries, vertical, JSON.stringify(platform), 
            status, flow, loyalty, description, tracking_type, JSON.stringify(allowed_media), 
            restrictions, geo_target, creative, s2s_postback_url]
        );
        res.status(201).json({ message: 'Offer created successfully' });
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Error creating offer' });
    }
};

exports.getOffers = async (req, res) => {
    try {
        const [offers] = await db.query('SELECT * FROM offers');
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({ message: 'Error fetching offers' });
    }
};
