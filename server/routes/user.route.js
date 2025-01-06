import express from "express";
import { getTeacherProfile } from "../controllers/teacher.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/profile", verifyToken, getTeacherProfile);

export default router;
