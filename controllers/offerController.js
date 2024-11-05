const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createOffer = async (req, res) => {
    try {
        const { name, price_format, payout, allowed_countries, vertical, platform } = req.body;
        const [result] = await db.query(
            'INSERT INTO Offers (name, price_format, payout, allowed_countries, vertical, platform, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [name, price_format, payout, JSON.stringify(allowed_countries), vertical, JSON.stringify(platform)]
        );
        res.status(200).send({ result: result });
    } catch (err) {
        console.log(err)
        res.status(500).send('Error creating offer');
    }
};

exports.listOffer = async (req, res) => {
    try {
        const [offers] = await db.query('SELECT * FROM offers');
        res.send({ result: offers})
    } catch (err) {
        res.status(500).send('Error listing offer');
    }
};
