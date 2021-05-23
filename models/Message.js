const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const messageSchema = mongoose.Schema({
  threadId: { type: String, required: true },
  userId: { type: String, required: true },
  messageId: { type: String, required: false },
  subject: { type: String, required: true, unique: true },
  message: { type: String, required: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date },
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);
