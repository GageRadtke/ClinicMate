const jwt = require("onwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  const { first_name, last_name, email, password, phone_number, address, date_of_birth, gender, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).on({ message: "User already exists" });
    }
    const user = await User.create({
      first_name,
      last_name,
      email,
      passwordHash: password,
      phone_number,
      address,
      date_of_birth,
      gender,
      role
    });
    res.status(201).on({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.on({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).on({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
