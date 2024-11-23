import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import studentsRoute from "./routes/student.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request Logging (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// CORS Configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL.split(",") // Production: Use the frontend URL from .env
      : ["http://localhost:5173", "http://127.0.0.1:5173"], // Development: Allow local URLs
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Environment and Port
const PORT = process.env.PORT || 3000;
console.log(process.env);

// Root Route (for quick API health check)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Hiring Booth API!",
    success: true,
  });
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/students", studentsRoute);

// Catch-All Route for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Generic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details for debugging
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
});

// Start Server and Connect to Database
app.listen(PORT, async () => {
  try {
    await connectDB(); // Connect to the database
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Exit process if database connection fails
  }
});
