const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {};

exports.loginUser = (req, res, next) => {};

const validateUsername = (username) => {
    if(!username) {
        return {
            code: 400,
            message: `Merci de préciser un nom d'utilisateur`
        }
    } else if (typeof username !== 'string') { 
        return {
            code: 400,
            message: `Merci de préciser un nom d'utilisateur valide (chaîne de caractères)`
        }
    } else if (username.length <= 1) {
        return {
            code: 400,
            message: `Merci de préciser un nom d'utilisateur valide (2 caractères ou plus)`
        }
    }
    return true;
}

exports.createUser = (req, res, next) => {
    const usernameValidation = validateUsername(req.body.username);
    if (usernameValidation.message) {
        return res.status(usernameValidation.code).json(usernameValidation);
    }

    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getUserProfile = (req, res, next) => {};

exports.getUser = (req, res, next) => {};

exports.modifyUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};