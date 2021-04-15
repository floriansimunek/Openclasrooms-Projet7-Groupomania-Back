const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdBy: { type: String },
    createdAt: { type: Date }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Thread', userSchema);