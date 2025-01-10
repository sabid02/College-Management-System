import express from "express";
import {
  registerStudent,
  loginStudent,
  getStudents,
  deleteStudent,
} from "../controllers/student.controller.js"; // Import the Student controller

const router = express.Router();

// Register Student
router.post("/register", registerStudent);

// Student Login
router.post("/login", loginStudent);

router.get("/students", getStudents);

// Delete a Student by ID
router.delete("/students/:id", deleteStudent);

export default router;
