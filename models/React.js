const mongoose = require('mongoose');

const reactSchema = mongoose.Schema({
    createdBy: { type: String },
    createdAt: { type: Date }
});

module.exports = mongoose.model('React', reactSchema);