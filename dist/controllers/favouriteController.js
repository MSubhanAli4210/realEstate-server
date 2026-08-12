import Favourite from "../models/favourite.js";
export const addFavourite = async (req, res) => {
    try {
        const { listingId } = req.body;
        const favourite = await Favourite.create({
            user: req.userId,
            listing: listingId,
        });
        return res.status(201).json({
            message: "Listing added to favourites",
            favourite,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Listing already in favourites",
            });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getMyFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.find({ user: req.userId }).populate("listing");
        return res.status(200).json({
            message: "Favourites retrieved successfully",
            favourites,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const removeFavourite = async (req, res) => {
    try {
        const favourite = await Favourite.findById(req.params.id);
        if (!favourite) {
            return res.status(404).json({ message: "Favourite not found" });
        }
        if (favourite.user.toString() !== req.userId) {
            return res.status(403).json({
                message: "You are not authorized to remove this favourite",
            });
        }
        await Favourite.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Favourite removed successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
