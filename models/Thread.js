const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const threadSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date }
});

threadSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Thread', threadSchema);