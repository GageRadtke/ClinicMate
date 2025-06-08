const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  prescription_id: { type: String, required: true, unique: true },
  patient_id:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor_id:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medications:     [{ 
      name: String, 
      dosage: String, 
      frequency: String 
  }]
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);
