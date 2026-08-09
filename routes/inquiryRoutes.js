import express from "express";
import {
  createInquiry,
  getMyInquiries,
  getInquiriesForListing,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createInquiry);
router.get("/mine", protect, getMyInquiries);
router.get("/listing/:listingId", protect, getInquiriesForListing);
router.delete("/:id", protect, deleteInquiry);

export default router;