import Listing from "../models/listing.js";
export const createListing = async (req, res) => {
    try {
        const { title, location, price, bedrooms, images } = req.body;
        const newListing = await Listing.create({
            title,
            location,
            price,
            bedrooms,
            images,
            owner: req.userId,
        });
        return res.status(201).json({
            message: "Listing created successfully",
            listing: newListing,
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
export const getListings = async (req, res) => {
    try {
        const listings = await Listing.find().populate("owner", "username email");
        return res.status(200).json({
            message: "Listings retrieved successfully",
            listings,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate("owner", "username email");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        return res.status(200).json({
            message: "Listing retrieved successfully",
            listing,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const updateListing = async (req, res) => {
    try {
        const { title, location, price, bedrooms, images } = req.body;
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing.owner.toString() !== req.userId && req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to update this listing",
            });
        }
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { title, location, price, bedrooms, images }, { new: true, runValidators: true });
        return res.status(200).json({
            message: "Listing updated successfully",
            listing: updatedListing,
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
export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing.owner.toString() !== req.userId && req.userRole !== "admin") {
            return res.status(403).json({
                message: "You are not authorized to delete this listing",
            });
        }
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Listing deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
