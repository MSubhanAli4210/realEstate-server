import express from "express";
import {
  createReview,
  getReviewsForListing,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/listing/:listingId", getReviewsForListing); // public, no auth needed to view reviews
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;