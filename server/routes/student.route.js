import express from "express";
import {
  registerStudent,
  loginStudent,
} from "../controllers/student.controller.js"; // Import the Student controller

const router = express.Router();

// Register Student
router.post("/register", registerStudent);

// Student Login
router.post("/login", loginStudent);

export default router;
