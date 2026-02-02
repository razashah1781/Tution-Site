const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth'); // We will create this middleware

// POST /api/leads - Create a new lead (Public)
router.post('/', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.json(savedLead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/leads - Get all leads (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
