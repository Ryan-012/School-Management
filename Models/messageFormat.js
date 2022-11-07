const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  createBy: { type: String, required: true },
  messageTo: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("message", messageSchema);
