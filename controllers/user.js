const User = require('../models/User');

exports.getAllUsers = (req, res, next) => {};

exports.loginUser = (req, res, next) => {};

exports.createUser = (req, res, next) => {
    //delete req.body.id;
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