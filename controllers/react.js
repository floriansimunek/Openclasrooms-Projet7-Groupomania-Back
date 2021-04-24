const React = require('../models/React');

exports.postReact = (req, res, next) => {
    const react = new React({
        createdBy: req.body.userId,
        createdAt: Date.now()
    });
    
    react.save()
        .then(() => res.status(201).json({
            react: {
                reactId: react._id,
                createdBy: req.body.userId,
                createdAt: react.createdAt
            }
        }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllReact = (req, res, next) => {};

exports.getReact = (req, res, next) => {};

exports.modifyReact = (req, res, next) => {};

exports.deleteReact = (req, res, next) => {};