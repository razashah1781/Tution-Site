const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

// GET /api/resources - Get all resources (Public)
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/resources - Add a resource (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        const savedResource = await newResource.save();
        res.json(savedResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/resources/:id - Delete a resource (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ msg: 'Resource not found' });

        await resource.deleteOne();
        res.json({ msg: 'Resource removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
