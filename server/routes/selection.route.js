import express from "express";
import {
  selectTopic,
  getUserSelectedTopics,
  approveOrRejectTopic,
  cancelTopicSelection,
} from "../controllers/selection.controller.js";

const router = express.Router();
// Route for students to select a topic
router.post("/select", selectTopic);
router.delete("/cancel/:topicId", cancelTopicSelection);

// Route for teachers to view topic selections
router.get("/selected/:studentId", getUserSelectedTopics);

// Route for teachers to approve or reject a topic
router.put("/approve-reject", approveOrRejectTopic);

export default router;
