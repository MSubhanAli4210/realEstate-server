import mongoose, { Schema } from 'mongoose';
const reviewSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 500,
    },
}, { timestamps: true });
reviewSchema.index({ listing: 1, reviewer: 1 }, { unique: true });
const Review = mongoose.model('Review', reviewSchema);
export default Review;
