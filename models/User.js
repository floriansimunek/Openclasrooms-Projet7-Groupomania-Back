/*const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  createdAt: { type: Date },
});

userSchema.plugin(uniqueValidator, {
  message: `L'adresse mail {VALUE} existe déjà, elle doit être unique !`,
});

module.exports = mongoose.model("User", userSchema);*/

const Sequelize = require("sequelize");

module.exports = (db) => {
  const User = db.define(
    "User",
    {
      _id: { type: Sequelize.NUMBER, autoIncrement: true, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    },
    { tableName: "users" }
  );
  return User;
};
