const Message = require("../models/Message");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

// Simple symmetric encryption (for demonstration only)
// In Test stage you might switch to a more robust service or library.
const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.JWT_SECRET, "hex"), Buffer.alloc(16, 0));
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// @desc    Send secure message
// @route   POST /api/messages
// @access  Protected
const sendMessage = async (req, res, next) => {
  const { recipient_id, content } = req.body;
  try {
    const encryptedContent = encrypt(content);
    const newMessage = new Message({
      message_id: uuidv4(),
      sender_id: req.user._id,
      recipient_id,
      content: encryptedContent
    });
    const savedMsg = await newMessage.save();
    res.status(201).on(savedMsg);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages for current user
// @route   GET /api/messages
// @access  Protected
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: req.user._id },
        { recipient_id: req.user._id }
      ]
    }).populate("sender_id", "first_name last_name").populate("recipient_id", "first_name last_name");
    res.on(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessages };
