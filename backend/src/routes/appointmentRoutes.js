const express = require("express");

const AppointmentService = require("../services/appointmentService");
const authMiddleware = require("../middleware/authMiddleware");
const {appointmentRules, validateAppointment,} = require("../middleware/validators/appointmentValidator");

const router = express.Router();

 // Create
router.post("/", authMiddleware(["doctor", "admin"]),
  appointmentRules,
  validateAppointment,
  async (req, res, next) => {
    try {
      const newAppt = await AppointmentService.create(req.body);
      res.status(201).json(newAppt);
    } catch (err) {
      next(err);
    }
  }
 );

 // Read all
router.get("/", authMiddleware(["doctor", "nurse", "admin"]),
  async (req, res, next) => {
    try {
      const list = await AppointmentService.list();
      res.json(list);
    } catch (err) {
      next(err);
    }
  }
 );

// Read one
router.get("/:id", authMiddleware(["doctor", "nurse", "admin"]),
  async (req, res, next) => {
    try {
      const appt = await AppointmentService.findById(req.params.id);
      if (!appt) return res.sendStatus(404);
      res.json(appt);
    } catch (err) {
      next(err);
    }
  }
 );

 // Update
router.put("/:id", authMiddleware(["doctor", "admin"]),
  appointmentRules,
  validateAppointment,
  async (req, res, next) => {
    try {
      const updated = await AppointmentService.update(req.params.id, req.body);
      if (!updated) return res.sendStatus(404);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
 );

 // Delete
router.delete("/:id", authMiddleware(["admin"]),
  async (req, res, next) => {
    try {
      await AppointmentService.remove(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
 );

const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createAppointment)
  .get(protect, getAppointments);

router.route("/:id")
  .patch(protect, updateAppointmentStatus);

module.exports = router;
