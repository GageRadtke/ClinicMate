const express = require("express");
const router = express.Router();
const { createPrescription, getPrescriptions } = require("../controllers/prescriptionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createPrescription)
  .get(protect, getPrescriptions);

module.exports = router;
