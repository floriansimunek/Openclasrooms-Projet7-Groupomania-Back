const jwt = require("jsonwebtoken");
const Thread = require("../models/Thread");
const Message = require("../models/Message");

const fieldsFilters = {
  Thread: {
    getThread: ["_id", "userId", "name", "description", "createdAt"],
    getAllThreads: ["_id", "userId", "name", "description", "createdAt"],
  },
  Message: {
    getMessage: [
      "_id",
      "threadId",
      "userId",
      "subject",
      "message",
      "imageUrl",
      "createdAt",
    ],
    getAllMessages: [
      "_id",
      "threadId",
      "userId",
      "subject",
      "message",
      "imageUrl",
      "createdAt",
    ],
  },
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createThread = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
  const { userId } = decodedToken; // const userId = decodedToken.userId;

  const thread = new Thread({
    userId: userId,
    name: req.body.name,
    description: req.body.description,
    createdAt: Date.now(),
  });

  thread
    .save()
    .then(() =>
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
  Thread.find({}, fieldsFilters.Thread.getAllThreads)
    .then((threads) => res.status(200).json(threads))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getThread = (req, res) => {
  Thread.findOne({ _id: req.params.threadId }, fieldsFilters.Thread.getThread)
    .then((thread) => res.status(200).json(thread))
    .catch((error) => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modifyThread = (req, res) => {
  Thread.updateOne(
    { _id: req.params.threadId },
    { ...req.body, _id: req.params.threadId }
  )
    .then(() => {
      Thread.findOne({ _id: req.params.threadId })
        .then((thread) => res.status(200).json(thread))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteThread = (req, res) => {
  Thread.findOne({ _id: req.params.threadId }, fieldsFilters.Thread.getThread)
    .then((thread) => {
      res.status(200).json(thread);
      Thread.deleteOne({ _id: req.params.threadId }).catch((error) =>
        res.status(404).json({ error })
      );
    })
    .catch((error) => res.status(404).json({ error }));
};

//messages
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.createMessage = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_SECRET_TOKEN);
  const { userId } = decodedToken; // const userId = decodedToken.userId;

  const message = new Message({
    threadId: req.params.threadId,
    userId: userId,
    subject: req.body.subject,
    message: req.body.message,
    imageUrl: req.body.imageUrl,
    createdAt: Date.now(),
  });

  message
    .save()
    .then(() =>
      res.status(201).json({
        message: {
          messageId: message._id,
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
  Message.find(
    { threadId: req.params.threadId },
    fieldsFilters.Message.getAllMessages
  )
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getMessage = (req, res) => {
  Message.findOne(
    { _id: req.params.messageId },
    fieldsFilters.Message.getMessage
  )
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modifyMessage = (req, res) => {
  Message.updateOne(
    { _id: req.params.messageId },
    { ...req.body, _id: req.params.messageId }
  )
    .then(() => {
      Message.findOne({ _id: req.params.messageId })
        .then((message) => res.status(200).json(message))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.deleteMessage = (req, res) => {
  Message.findOne({ _id: req.params.messageId })
    .then((message) => {
      res.status(200).json(message);
      Message.deleteOne({ _id: req.params.messageId }).catch((error) =>
        res.status(404).json({ error })
      );
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
