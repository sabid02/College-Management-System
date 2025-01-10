import express from "express";
import {
  registerTeacher,
  loginTeacher,
  getAllTeachers,
} from "../controllers/teacher.controller.js";

const router = express.Router();

// Register Teacher
router.post("/register", registerTeacher);

// Teacher Login
router.post("/login", loginTeacher);

router.get("/teachers", getAllTeachers);

export default router;
