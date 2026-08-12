import express from "express";
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Logged-in user manages their own account
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.delete("/me", protect, deleteMe);

// Admin-only management of other users
router.get("/", protect, isAdmin, getAllUsers);
router.get("/:id", protect, isAdmin, getUserById);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;

