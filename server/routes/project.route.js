import express from "express";
import {
  createTopic,
  getTopicsByTeacher,
  deleteTopic,
  updateTopic,
  getTopicById,
} from "../controllers/project.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // Assuming this middleware verifies the teacher

const router = express.Router();

// Route to create a new topic (using teacher's MongoDB _id from URL)
router.post("/create/:teacherId", createTopic);
router.get("/get/:teacherId", getTopicsByTeacher);
router.delete("/delete/:topicId", deleteTopic);
router.put("/update/:topicId", updateTopic);
router.get("/get-topic/:topicId", getTopicById);

export default router;
