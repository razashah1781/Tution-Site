const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, enum: ['O-Level Math', 'O-Level CS', 'A-Level CS', 'Other'], default: 'Other' },
    message: { type: String },
    status: { type: String, enum: ['New', 'Contacted', 'Booked', 'Closed'], default: 'New' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
