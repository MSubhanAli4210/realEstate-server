import mongoose, { Schema } from 'mongoose';
const favouriteSchema = new Schema({
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
}, { timestamps: true });
favouriteSchema.index({ user: 1, listing: 1 }, { unique: true });
const Favourite = mongoose.model('Favourite', favouriteSchema);
export default Favourite;
