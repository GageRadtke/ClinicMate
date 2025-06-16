const express = require("express");
const router = express.Router();

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

// Public or protected routes depending on your app needs
router.get("/", protect, getAppointments);
router.get("/:id", protect, getAppointmentById);

// Only certain roles should create or manage appointments
router.post("/", protect, createAppointment);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);

module.exports = router;
