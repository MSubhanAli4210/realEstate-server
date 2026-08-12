import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IInquiry extends Document {
  listing: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  response: string;
  status: 'pending' | 'responded';
}

const inquirySchema = new Schema<IInquiry>(
  {
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
  },
  { timestamps: true }
);

const Inquiry: Model<IInquiry> = mongoose.model<IInquiry>('Inquiry', inquirySchema);

export default Inquiry;