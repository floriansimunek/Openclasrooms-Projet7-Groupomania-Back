const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
    threadId: { type: String, required: true },
    subject: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date }
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Message', messageSchema);