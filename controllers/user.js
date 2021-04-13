const bcrypt = require('bcrypt');

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

//password validation system
const validatePassword = (password, confirmPassword) => {
    if(!password || !confirmPassword) {
        return {
            code: 400,
            message: `Merci de saisir un mot de passe et de le confirmer`
        }
    } else if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
        return {
            code: 400,
            message: `Merci de saisir un mot de passe valide (chaîne de caractères)`
        }
    } else if (password.length <= 5 || confirmPassword.length <= 5) {
        return {
            code: 400,
            message: 'Merci de saisir un mot de passe de plus de 6 caractères ou plus'
        }
    } else if (password !== confirmPassword) {
        return {
            code: 400,
            message: `Les deux mots de passes ne correspondent pas`
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

    //password validation
    const passwordValidation = validatePassword(req.body.password, req.body.confirmPassword);
    if(passwordValidation.message) {
        return res.status(passwordValidation.code).json(passwordValidation);
    }

    
    bcrypt.hash(req.body.password, 10)
        .then(hash => { 
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUserProfile = (req, res, next) => {};

exports.getUser = (req, res, next) => {};

exports.modifyUser = (req, res, next) => {};

exports.deleteUser = (req, res, next) => {};