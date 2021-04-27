const jwt = require('jsonwebtoken');
const React = require('../models/React');

const fieldsFilters = {
    React: {
        getReacts: ["_id", "type", "threadId", "messageId", "createdBy", "createdAt"]
    }
}

exports.postReact = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
    const {userId} = decodedToken; // const userId = decodedToken.userId;
    
    const react = new React({
        type: req.body.type,
        threadId: req.params.threadId,
        messageId: req.params.messageId,
        createdBy: userId,
        createdAt: Date.now()
    });
    
    react.save()
        .then(() => res.status(201).json({
            react: {
                reactId: react._id,
                threadId: req.params.threadId,
                messageId: req.params.messageId,
                type: req.body.type,
                createdBy: userId,
                createdAt: react.createdAt
            }
        }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllReacts = (req, res, next) => {
    React.find({}, fieldsFilters.React.getReacts)
        .then(reacts => res.status(200).json(reacts))
        .catch(error => res.status(400).json({ error }));
};

exports.getReact = (req, res, next) => {
    React.findOne({ _id: req.params.reactId }, fieldsFilters.React.getReacts)
        .then(react => res.status(200).json(react))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyReact = (req, res, next) => {
    React.updateOne({ _id: req.params.reactId }, { ...req.body, _id: req.params.reactId }, fieldsFilters.React.getReacts)
        .then(() => {
            React.findOne({ _id: req.params.reactId })
                .then(react => res.status(200).json(react))
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.deleteReact = (req, res, next) => {
    React.findOne({ _id: req.params.reactId })
        .then(react => {
            res.status(200).json(react)
            React.deleteOne({ _id: req.params.reactId })
                .catch(error => res.status(404).json({ error }));
        })
        .catch(error => res.status(404).json({ error }));
};