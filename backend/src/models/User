const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone_number: { type: String },
  address:     { type: String },
  date_of_birth: { type: Date },
  gender:      { type: String, enum: ["Male", "Female", "Other"] },
  role:        { type: String, enum: ["patient", "doctor", "admin"], default: "patient" }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);
