const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const threadSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date },
});

threadSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Thread", threadSchema);
