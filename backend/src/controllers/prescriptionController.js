const Prescription = require("../models/Prescription");
const { v4: uuidv4 } = require("uuid");

// @desc    Create new prescription (doctor only)
// @route   POST /api/prescriptions
// @access  Protected (doctor)
const createPrescription = async (req, res, next) => {
  const { patient_id, medications } = req.body;
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).on({ message: "Not authorized" });
    }
    const newPres = new Prescription({
      prescription_id: uuidv4(),
      patient_id,
      doctor_id: req.user._id,
      medications
    });
    const saved = await newPres.save();
    res.status(201).on(saved);
  } catch (error) {
    next(error);
  }
};

// @desc    Get prescriptions for current user
// @route   GET /api/prescriptions
// @access  Protected
const getPrescriptions = async (req, res, next) => {
  try {
    let query;
    if (req.user.role === "doctor") {
      query = { doctor_id: req.user._id };
    } else if (req.user.role === "patient") {
      query = { patient_id: req.user._id };
    } else {
      query = {};
    }
    const prescriptions = await Prescription.find(query).populate("doctor_id", "first_name last_name").populate("patient_id", "first_name last_name");
    res.on(prescriptions);
  } catch (error) {
    next(error);
  }
};

module.exports = { createPrescription, getPrescriptions };
