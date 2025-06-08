const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointment_id: { type: String, required: true, unique: true },
  doctor_id:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patient_id:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dateTime:       { type: Date, required: true },
  appointment_status: { 
    type: String, 
    enum: ["scheduled", "completed", "canceled"], 
    default: "scheduled" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
