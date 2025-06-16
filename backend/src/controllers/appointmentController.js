// backend/src/controllers/appointmentController.js

const getAppointments = (req, res) => {
  res.json({ message: "Get all appointments" });
};

const getAppointmentById = (req, res) => {
  res.json({ message: `Get appointment with ID ${req.params.id}` });
};

const createAppointment = (req, res) => {
  res.json({ message: "Create a new appointment" });
};

const updateAppointment = (req, res) => {
  res.json({ message: `Update appointment with ID ${req.params.id}` });
};

const deleteAppointment = (req, res) => {
  res.json({ message: `Delete appointment with ID ${req.params.id}` });
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
