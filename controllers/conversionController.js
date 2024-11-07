// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
// conversionController.js
exports.recordConversion = async (req, res) => {
    const { userId, offerId, conversionType, country } = req.body;

    try {
        const [offer] = await db.query('SELECT payout FROM offers WHERE id = ?', [offerId]);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        await db.query(
            'INSERT INTO conversions (user_id, offer_id, conversion_type, payout, country) VALUES (?, ?, ?, ?, ?)',
            [userId, offerId, conversionType, offer.payout, country]
        );
        res.status(201).json({ message: 'Conversion recorded' });
    } catch (error) {
        res.status(500).json({ message: 'Error recording conversion' });
    }
};
