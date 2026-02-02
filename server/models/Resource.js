const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['O-Level Math', 'O-Level CS', 'A-Level CS'], required: true },
    link: { type: String, required: true },
    type: { type: String, default: 'PDF' },
    description: { type: String }
});

module.exports = mongoose.model('Resource', ResourceSchema);
