import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IListing extends Document {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  images: string[];
  owner: Types.ObjectId;
}

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
      min: [0, 'Number of bedrooms must be a positive number'],
    },
    images: {
      type: [String],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Listing: Model<IListing> = mongoose.model<IListing>('Listing', listingSchema);

export default Listing;