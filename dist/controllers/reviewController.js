import Review from "../models/review.js";
import Listing from "../models/listing.js";
export const createReview = async (req, res) => {
    try {
        const { listingId, rating, comment } = req.body;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const review = await Review.create({
            listing: listingId,
            reviewer: req.userId,
            rating,
            comment,
        });
        return res.status(201).json({
            message: "Review created successfully",
            review,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "You already reviewed this listing",
            });
        }
        if (err.name === "ValidationError") {
            const firstError = Object.values(err.errors)[0];
            return res.status(400).json({ message: firstError.message });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getReviewsForListing = async (req, res) => {
    try {
        const reviews = await Review.find({
            listing: req.params.listingId,
        }).populate("reviewer", "username");
        return res.status(200).json({
            message: "Reviews retrieved successfully",
            reviews,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.reviewer.toString() !== req.userId &&
            req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to update this review",
            });
        }
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { rating, comment }, { new: true, runValidators: true });
        return res.status(200).json({
            message: "Review updated successfully",
            review: updatedReview,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.reviewer.toString() !== req.userId &&
            req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to delete this review",
            });
        }
        await Review.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
