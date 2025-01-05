import express from "express";
import { signin, signup } from "../controllers/admin.controller.js"; // Import the controller functions

const router = express.Router();

// Register Admin
router.post("/register", signup); // Route for registering a new admin

// Admin Login
router.post("/login", signin); // Route for admin login

export default router;
