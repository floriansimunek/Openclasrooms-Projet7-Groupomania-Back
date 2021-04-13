const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {};

exports.loginUser = (req, res, next) => {};

//username validation system
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

//email validation system
const validateEmail = (email) => {
    if(!email) {
        return {
            code: 400,
            message: `Merci de saisir une adresse mail`
        }
    } else if (typeof email !== 'string') {
        return {
            code: 400,
            message: `Merci de saisir une adresse mail valide (chaîne de caractères au format example@domaine.ext)`
        }
    } else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        return {
            code: 400,
            message: `Merci de saisir une adresse mail valide (chaîne de caractères au format example@domaine.ext)`
        }
    }
    return true;
}

exports.createUser = (req, res, next) => {
    //username validation
    const usernameValidation = validateUsername(req.body.username);
    if (usernameValidation.message) {
        return res.status(usernameValidation.code).json(usernameValidation);
    }

    //email validation
    const emailValidation = validateEmail(req.body.email);
    if(emailValidation.message) {
        return res.status(emailValidation.code).json(emailValidation);
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