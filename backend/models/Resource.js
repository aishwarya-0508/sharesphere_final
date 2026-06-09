import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['Books', 'Electronics', 'Furniture', 'Sports Equipment', 'Stationery', 'Tools', 'Medical Equipment', 'Household Items', 'Educational Materials', 'Other'],
    required: true
  },
  description: { type: String, required: true },
  image: { type: String, default: null },
  condition: { type: String, enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'], required: true },
  status: {
    type: String,
    enum: ['Available', 'Requested', 'Approved', 'Shared', 'Returned'],
    default: 'Available'
  },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactInfo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resource', resourceSchema);
