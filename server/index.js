import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.route.js";
import teacherRoutes from "./routes/teacher.route.js"; // Teacher routes
import studentRoutes from "./routes/student.route.js";
import topicRoutes from "./routes/project.route.js";
import profileRoutes from "./routes/profile.route.js";
import topicSelection from "./routes/selection.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use("/api/admin", adminRoutes); // Admin routes accessible at /api/admin
app.use("/api/teacher", teacherRoutes); // Teacher routes
app.use("/api/student", studentRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/topic", topicSelection);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
