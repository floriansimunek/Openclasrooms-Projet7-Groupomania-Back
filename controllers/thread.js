const jwt = require("jsonwebtoken");

const { Thread } = require("../models");
const { Message } = require("../models");
const { React } = require("../models");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createThread = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
  const { userId } = decodedToken; // const userId = decodedToken.userId;

  Thread.create({
    userId: userId,
    name: req.body.name,
    description: req.body.description,
    createdAt: Date.now(),
  })
    .then((thread) =>
      res.status(201).json({
        thread: {
          threadId: thread._id,
          userId: userId,
          name: req.body.name,
          description: req.body.description,
          createdAt: thread.createdAt,
        },
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllThreads = (req, res) => {
  Thread.findAll()
    .then((threads) => res.status(200).json(threads))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getThread = (req, res) => {
  Thread.findOne({ where: { _id: req.params.threadId } })
    .then((thread) => res.status(200).json(thread))
    .catch((error) => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modifyThread = (req, res) => {
  Thread.update(
    {
      name: req.body.name,
      description: req.body.description,
      updatedAt: Date.now(),
    },
    { where: { _id: req.params.threadId } }
  )
    .then(() => {
      Thread.findOne({ where: { _id: req.params.threadId } })
        .then((thread) => res.status(200).json(thread))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteThread = (req, res) => {
  React.destroy({
    where: { threadId: req.params.threadId, messageId: req.params.messageId },
  })
    .then(() => {
      Message.destroy({ where: { threadId: req.params.threadId } })
        .then(() => {
          Thread.findOne({ where: { _id: req.params.threadId } })
            .then((thread) => {
              res.status(200).json(thread);
              Thread.destroy({ where: { _id: req.params.threadId } })
                .then((thread) => res.status(200).json(thread))
                .catch((error) => res.status(404).json({ error }));
            })
            .catch((error) => res.status(404).json({ error }));
        })
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

//messages
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createMessage = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
  const { userId } = decodedToken; // const userId = decodedToken.userId;

  Message.create({
    threadId: req.params.threadId,
    messageId: req.body.messageId,
    userId: userId,
    subject: req.body.subject,
    message: req.body.message,
    imageUrl: req.body.imageUrl,
    createdAt: Date.now(),
  })
    .then((message) =>
      res.status(201).json({
        message: {
          messageId: req.body.messageId,
          threadId: req.params.threadId,
          userId: userId,
          subject: req.body.subject,
          message: req.body.message,
          imageUrl: req.body.imageUrl,
          createdAt: message.createdAt,
        },
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllMessages = (req, res) => {
  Message.findAll({ where: { threadId: req.params.threadId } })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getMessage = (req, res) => {
  Message.findOne({ where: { _id: req.params.messageId } })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modifyMessage = (req, res) => {
  Message.update(
    {
      subject: req.body.subject,
      message: req.body.message,
      updatedAt: Date.now(),
    },
    { where: { _id: req.params.messageId } }
  )
    .then(() => {
      Message.findOne({ where: { _id: req.params.messageId } })
        .then((message) => res.status(200).json(message))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteMessage = (req, res) => {
  React.destroy({
    where: { threadId: req.params.threadId, messageId: req.params.messageId },
  })
    .then(() => {
      Message.findOne({ where: { _id: req.params.messageId } })
        .then((message) => {
          res.status(200).json(message);
          Message.destroy({ where: { _id: req.params.messageId } })
            .then((message) => res.status(200).json(message))
            .catch((error) => res.status(404).json({ error }));
        })
        .catch((error) => res.status(404).json({ error }));
    })

    .catch((error) => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.postGif = (req, res) => {
  res.status(201).json({
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
};
