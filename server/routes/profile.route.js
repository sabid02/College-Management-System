// routes/profile.route.js
import express from "express";
import { getUser } from "../controllers/user.controller.js"; // Import the controller
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Define the route to fetch profile details by role and ID
router.get("/:role/:userId", verifyToken, getUser);

export default router;
