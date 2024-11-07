const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.createOffer = async (req, res) => {

    const {
        offer_name, // Updated from name to match your schema
        payout,
        price_format,
        vertical,
        flow,
        platforms,
        tracking_type,
        allowed_countries,
        blacklisted_countries,
        description,
        restrictions,
        offer_capped,
        domain,
        media_type,
        subaffiliate,
        sub_id1,
        sub_id2
    } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await db.query(
            `INSERT INTO offers (
                offer_name, price_format, payout, vertical, flow, platforms, 
                tracking_type, allowed_countries, blacklisted_countries, description, 
                restrictions, offer_capped, domain, media_type, subaffiliate, 
                sub_id1, sub_id2, image_path
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                offer_name,
                price_format,
                payout,
                vertical,
                flow,
                JSON.stringify(platforms),
                tracking_type,
                allowed_countries,
                blacklisted_countries,
                description,
                restrictions,
                offer_capped,
                domain,
                media_type,
                subaffiliate,
                sub_id1,
                sub_id2,
                imagePath
            ]
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


// Function for affiliates to apply for an offer
exports.applyForOffer = async (req, res) => {
    const { offer_id } = req.body;
    const affiliate_id = req.user.id;

    try {
        // Check if the application already exists
        const [existingApplication] = await db.query(
            'SELECT * FROM applications WHERE offer_id = ? AND affiliate_id = ?',
            [offer_id, affiliate_id]
        );

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this offer.' });
        }

        // Insert new application
        await db.query(
            'INSERT INTO applications (offer_id, affiliate_id, status, applied_at) VALUES (?, ?, "pending", NOW())',
            [offer_id, affiliate_id]
        );

        res.status(200).json({ message: 'Application submitted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Function for advertisers to update the application status
exports.updateApplicationStatus = async (req, res) => {
    const { application_id, status } = req.body;

    try {
        // Update the application status
        await db.query(
            'UPDATE applications SET status = ? WHERE id = ?',
            [status, application_id]
        );

        res.status(200).json({ message: `Application ${status} successfully.` });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};