/*const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const threadSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date },
});

threadSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Thread", threadSchema);*/

const Sequelize = require("sequelize");

module.exports = (db) => {
  const Thread = db.define(
    "Thread",
    {
      _id: { type: Sequelize.NUMBER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.NUMBER, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
    },
    { tableName: "threads" }
  );
  return Thread;
};
