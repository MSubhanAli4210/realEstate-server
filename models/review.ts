import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IReview extends Document {
  listing: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
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
  },
  { timestamps: true }
);

reviewSchema.index({ listing: 1, reviewer: 1 }, { unique: true });

const Review: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);

export default Review;