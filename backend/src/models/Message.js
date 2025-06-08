const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message_id:  { type: String, required: true, unique: true },
  sender_id:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient_id:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content:     { type: String, required: true }, // store encrypted text
  timestamp:   { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
