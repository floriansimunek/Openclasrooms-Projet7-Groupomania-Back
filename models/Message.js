/*const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const messageSchema = mongoose.Schema({
  threadId: { type: String, required: true },
  userId: { type: String, required: true },
  messageId: { type: String, required: false },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date },
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);*/

const Sequelize = require("sequelize");

module.exports = (db) => {
  const Message = db.define(
    "Message",
    {
      _id: { type: Sequelize.NUMBER, autoIncrement: true, primaryKey: true },
      threadId: { type: Sequelize.NUMBER, allowNull: false },
      userId: { type: Sequelize.NUMBER, allowNull: false },
      messageId: { type: Sequelize.NUMBER, allowNull: true },
      subject: { type: Sequelize.STRING, allowNull: false },
      message: { type: Sequelize.STRING, allowNull: true },
      imageUrl: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    },
    { tableName: "messages" }
  );
  return Message;
};
