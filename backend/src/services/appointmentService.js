const Appointment = require("../models/Appointment");

class AppointmentService {
  static async create(data) {
    // business logic, defaults, notifications, etc. go here
    const appt = new Appointment(data);
    return appt.save();
  }

  static async list(filter = {}) {
    return Appointment.find(filter).populate("patientId doctorId");
  }

  static async findById(id) {
    return Appointment.findById(id).populate("patientId doctorId");
  }

  static async update(id, data) {
    return Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  static async remove(id) {
    return Appointment.findByIdAndDelete(id);
  }
}

module.exports = AppointmentService;
