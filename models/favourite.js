import { model, Schema } from 'mongoose';

const favouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent the same user from favouriting the same listing twice
favouriteSchema.index({ user: 1, listing: 1 }, { unique: true });

const Favourite = model('Favourite', favouriteSchema);

export default Favourite;