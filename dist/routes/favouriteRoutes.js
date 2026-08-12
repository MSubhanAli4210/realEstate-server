import express from "express";
import { addFavourite, getMyFavourites, removeFavourite, } from "../controllers/favouriteController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protect, addFavourite);
router.get("/", protect, getMyFavourites);
router.delete("/:id", protect, removeFavourite);
export default router;
