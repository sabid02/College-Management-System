import express from "express";
import {
  selectTopic,
  getTopicSelections,
  approveOrRejectTopic,
  cancelTopicSelection,
} from "../controllers/selection.controller.js";

const router = express.Router();
// Route for students to select a topic
router.post("/select", selectTopic);
router.delete("/cancel/:topicId", cancelTopicSelection);

// Route for teachers to view topic selections
router.get("/selections", getTopicSelections);

// Route for teachers to approve or reject a topic
router.put("/approve-reject", approveOrRejectTopic);

export default router;
