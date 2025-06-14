const { body, validationResult } = require("express-validator");

// Define rules for creating/updating an appointment
exports.appointmentRules = [
  body("patientId").isMongoId().withMessage("Must be a valid patient ID"),
  body("doctorId").isMongoId().withMessage("Must be a valid doctor ID"),
  body("scheduledFor")
    .isISO8601()
    .toDate()
    .withMessage("Must provide a valid date/time"),
  body("reason")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Reason is required"),
];

// Centralized error-checking middleware
exports.validateAppointment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
