// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).on({
    message: err.message || "Server Error"
  });
};

module.exports = errorHandler;
