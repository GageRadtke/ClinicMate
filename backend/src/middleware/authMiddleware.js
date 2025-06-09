const jwt = require("onwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).on({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");
    if (!req.user) {
      return res.status(401).on({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).on({ message: "Token failed" });
  }
};

module.exports = { protect };
