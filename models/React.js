/*const mongoose = require("mongoose");

const reactSchema = mongoose.Schema({
  type: { type: String, required: true },
  threadId: { type: String, required: true },
  messageId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date },
});

module.exports = mongoose.model("React", reactSchema);*/

const Sequelize = require("sequelize");

module.exports = (db) => {
  const React = db.define(
    "React",
    {
      _id: { type: Sequelize.NUMBER, autoIncrement: true, primaryKey: true },
      type: { type: Sequelize.STRING, allowNull: false },
      threadId: { type: Sequelize.STRING, allowNull: false },
      messageId: { type: Sequelize.STRING, allowNull: false },
      userId: { type: Sequelize.NUMBER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    },
    { tableName: "reacts" }
  );
  return React;
};
