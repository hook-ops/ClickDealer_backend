const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.createOffer = async (req, res) => {
    console.log("sdf",req.user);
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
    const advertiser_id = req.user.userId;
    console.log(advertiser_id);

    try {
        await db.query(
            `INSERT INTO offers (
                offer_name, price_format, payout, vertical, flow, platforms, 
                tracking_type, allowed_countries, blacklisted_countries, description, 
                restrictions, offer_capped, domain, media_type, subaffiliate, 
                sub_id1, sub_id2, image_path, advertiser_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
                imagePath,
                advertiser_id
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
    const affiliate_id = req.user.userId;

    console.log("Offer ID:", offer_id); // Log the offer ID to check if it's correctly received
    console.log("Affiliate ID:", affiliate_id);

    if (!offer_id) {
        return res.status(400).json({ message: 'Offer ID is required' });
      }

    try {
        // Check if the application already exists
        const [existingApplication] = await db.query(
            'SELECT * FROM applications WHERE offer_id = ? AND affiliate_id = ?',
            [offer_id, affiliate_id]
        );

        if (existingApplication > 0) {
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

// offerController.js

exports.getPendingCampaigns = async (req, res) => {
    const affiliate_id = req.user.userId; // assuming userId is stored in req.user from the JWT token

    try {
        const [pendingCampaigns] = await db.query(`
            SELECT o.offer_name, o.price_format, o.payout, a.status 
            FROM applications AS a
            JOIN offers AS o ON a.offer_id = o.id
            WHERE a.affiliate_id = ? AND a.status = "pending"
        `, [affiliate_id]);

        res.status(200).json(pendingCampaigns);
    } catch (error) {
        console.error('Error fetching pending campaigns:', error);
        res.status(500).json({ message: 'Error fetching pending campaigns' });
    }
};




// In `offerController.js`

// Get pending applications for the advertiser's offers
exports.getPendingApplications = async (req, res) => {
    const advertiserId = req.user.userId; // Ensure this is retrieved from JWT
    try {
        const [applications] = await db.query(
            `SELECT a.id, a.status, a.applied_at, o.offer_name, o.price_format, o.payout, u.accountName as affiliateName 
            FROM applications a 
            JOIN offers o ON a.offer_id = o.id 
            JOIN users u ON a.affiliate_id = u.id 
            WHERE o.advertiser_id = ? AND a.status = 'pending'`,
            [advertiserId]
        );
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching pending applications:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Decide application (accept/reject)
exports.decideApplication = async (req, res) => {
    const { applicationId, decision } = req.body;
    try {
        await db.query(
            `UPDATE applications SET status = ? WHERE id = ?`,
            [decision, applicationId]
        );
        res.status(200).json({ message: `Application ${decision} successfully.` });
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


// In `offerController.js`

// Get accepted campaigns for the logged-in affiliate
exports.getMyCampaigns = async (req, res) => {
    const affiliateId = req.user.userId; // Ensure this is retrieved from JWT
    try {
        const [campaigns] = await db.query(
            `SELECT o.id as offerId, o.offer_name, o.price_format, o.payout, o.vertical, o.flow,  a.status 
            FROM applications a 
            JOIN offers o ON a.offer_id = o.id 
            WHERE a.affiliate_id = ? AND a.status = 'accepted'`,
            [affiliateId]
        );
        res.status(200).json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
