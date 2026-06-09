import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Shared', 'Returned'],
    default: 'Pending'
  },
  message: { type: String, default: '' },
  requestDate: { type: Date, default: Date.now },
  approvedDate: { type: Date, default: null },
  sharedDate: { type: Date, default: null },
  returnedDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Request', requestSchema);
