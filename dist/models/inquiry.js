import mongoose, { Schema } from 'mongoose';
const inquirySchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: 5,
        maxlength: 1000,
    },
    response: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'responded'],
        default: 'pending',
    },
}, { timestamps: true });
const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
