const jwt = require("jsonwebtoken");

const { React } = require("../models");
const fieldsFilters = {
  React: {
    getReacts: [
      "_id",
      "type",
      "threadId",
      "messageId",
      "userId",
      "createdBy",
      "createdAt",
    ],
  },
};

exports.postReact = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
  const { userId } = decodedToken; // const userId = decodedToken.userId;

  React.create({
    type: req.body.type,
    threadId: req.params.threadId,
    messageId: req.params.messageId,
    userId: userId,
    createdAt: Date.now(),
  })
    .then((react) =>
      res.status(201).json({
        react: {
          reactId: react._id,
          threadId: req.params.threadId,
          messageId: req.params.messageId,
          type: req.body.type,
          createdBy: userId,
          createdAt: react.createdAt,
        },
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllReacts = (req, res) => {
  React.findAll(
    { where: { threadId: req.params.threadId } },
    { where: { messageId: req.params.messageId } }
  )
    .then((reacts) => res.status(200).json(reacts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getReact = (req, res) => {
  React.findOne(
    { where: { _id: req.params.reactId } },
    { where: { threadId: req.params.threadId } },
    { where: { messageId: req.params.messageId } }
  )
    .then((react) => res.status(200).json(react))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyReact = (req, res) => {
  React.update(
    {
      type: req.body.type,
      updatedAt: Date.now(),
    },
    {
      where: {
        _id: req.params.reactId,
      },
    }
  )
    .then(() => {
      React.findOne({ where: { _id: req.params.reactId } })
        .then((react) => res.status(200).json(react))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteReact = (req, res) => {
  React.findOne({ where: { _id: req.params.reactId } })
    .then((react) => {
      res.status(200).json(react);
      React.destroy({ where: { _id: req.params.reactId } })
        .then((react) => res.status(200).json(react))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};
