const mongoose = require("mongoose");

const reactSchema = mongoose.Schema({
  type: { type: String, required: true },
  threadId: { type: String, required: true },
  messageId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date },
});

module.exports = mongoose.model("React", reactSchema);
