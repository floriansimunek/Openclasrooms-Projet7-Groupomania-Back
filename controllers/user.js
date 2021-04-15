const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const fieldsFilters = {
    User: {
        getAllUsers: ["_id", "username", "email", "createdAt"],
        getUser: ["_id", "username", "email", "createdAt"]
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllUsers = (req, res, next) => {
    User.find({}, fieldsFilters.User.getAllUsers)
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'}); 
                    }
                    res.status(200).json({ 
                        userId: user._id,
                        username: req.body.username,
                        email: req.body.email,
                        accessToken: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//username validation system
const validateUsername = (username, required) => {
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
const validateEmail = (email, required) => {
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
const validatePassword = (password, confirmPassword, required) => { 
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

const validateUserInputs = (username, email, password, confirmPassword, res, required = true) => {
    const usernameValidation = validateUsername(username, required);
    const emailValidation = validateEmail(email, required);
    const passwordValidation = validatePassword(password, confirmPassword, required);

    if (usernameValidation.message) {
        return res.status(usernameValidation.code).json(usernameValidation);
    } else if(emailValidation.message) {
        return res.status(emailValidation.code).json(emailValidation);
    } else if(passwordValidation.message) {
        return res.status(passwordValidation.code).json(passwordValidation);
    }
}

exports.createUser = (req, res, next) => {
    validateUserInputs(req.body.username, req.body.email, req.body.password, req.body.confirmPassword, res);

    bcrypt.hash(req.body.password, 10)
        .then(hash => { 
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                createdAt: Date.now()
            });
            user.save()
                .then(() => res.status(201).json({
                    user: {
                        userId: user._id,
                        username: req.body.username,
                        email: req.body.email,
                        createdAt: user.createdAt
                    },
                    accessToken: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getUserProfile = (req, res, next) => {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.userId }, fieldsFilters.User.getUser)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modifyUser = (req, res, next) => {
    validateUserInputs(req.body.username, req.body.email, req.body.password, req.body.confirmPassword, res, false);

    User.updateOne({ _id: req.params.userId }, { ...req.body, _id: req.params.userId })
        .then(() => {
            User.findOne({ _id: req.params.userId }, fieldsFilters.User.getUser)
                .then(user => res.status(200).json(user))
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.userId }, fieldsFilters.User.getUser)
        .then(user => {
            res.status(200).json(user)
            User.deleteOne({ _id: req.params.userId })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};