import Inquiry from "../models/inquiry.js";
import Listing from "../models/listing.js";
export const createInquiry = async (req, res) => {
    try {
        const { listingId, message } = req.body;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        const inquiry = await Inquiry.create({
            listing: listingId,
            sender: req.userId,
            message,
        });
        return res.status(201).json({
            message: "Inquiry sent successfully",
            inquiry,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getMyInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({ sender: req.userId }).populate("listing");
        return res.status(200).json({
            message: "Inquiries retrieved successfully",
            inquiries,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getInquiriesForListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing.owner.toString() !== req.userId && req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to view these inquiries",
            });
        }
        const inquiries = await Inquiry.find({
            listing: req.params.listingId,
        }).populate("sender", "username email");
        return res.status(200).json({
            message: "Inquiries retrieved successfully",
            inquiries,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const respondToInquiry = async (req, res) => {
    try {
        const { response } = req.body;
        const inquiry = await Inquiry.findById(req.params.id).populate("listing");
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        const listing = inquiry.listing;
        if (listing.owner.toString() !== req.userId && req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to respond to this inquiry",
            });
        }
        if (inquiry.response) {
            return res.status(409).json({
                message: "This inquiry has already been responded to",
            });
        }
        inquiry.response = response;
        inquiry.status = "responded";
        await inquiry.save();
        return res.status(200).json({
            message: "Response sent successfully",
            inquiry,
        });
    }
    catch (err) {
        if (err.name === "ValidationError") {
            const firstError = Object.values(err.errors)[0];
            return res.status(400).json({ message: firstError.message });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        if (inquiry.sender.toString() !== req.userId &&
            req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to delete this inquiry",
            });
        }
        await Inquiry.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Inquiry deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
