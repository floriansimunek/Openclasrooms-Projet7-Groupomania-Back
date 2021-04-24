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

exports.getAllReacts = (req, res, next) => {
    React.find()
        .then(reacts => res.status(200).json(reacts))
        .catch(error => res.status(400).json({ error }));
};

exports.getReact = (req, res, next) => {
    React.findOne({ _id: req.params.reactId })
        .then(react => res.status(200).json(react))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyReact = (req, res, next) => {};

exports.deleteReact = (req, res, next) => {
    React.findOne({ _id: req.params.reactId })
        .then(react => {
            res.status(200).json(react)
            React.deleteOne({ _id: req.params.reactId })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};