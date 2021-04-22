const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    password: { type: String, required: true },
    confirmPassword: { type: String},
    createdAt: { type: Date }
});

userSchema.plugin(uniqueValidator, { message: `L'adresse mail {VALUE} existe déjà, elle doit être unique !` });

module.exports = mongoose.model('User', userSchema);