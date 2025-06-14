const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// 1. Security headers
app.use(helmet());

// 2. Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                 // limit each IP to 100 requests per window
  })
);

// 3. CORS (restrict to your frontend origin)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 4. JSON body parsing (fixed)
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
