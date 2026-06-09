import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['request_submitted', 'request_approved', 'request_rejected', 'resource_returned', 'new_request'],
    required: true
  },
  relatedId: { type: mongoose.Schema.Types.ObjectId, default: null }, // Request or Resource ID
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);
