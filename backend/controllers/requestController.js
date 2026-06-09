import Request from '../models/Request.js';
import Resource from '../models/Resource.js';
import Notification from '../models/Notification.js';

export const createRequest = async (req, res) => {
  try {
    const { resourceId, message } = req.body;
    const buyerId = req.user.id;

    // Get resource details
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if already requested
    const existingRequest = await Request.findOne({
      buyerId,
      resourceId,
      status: { $in: ['Pending', 'Approved', 'Shared'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this resource' });
    }

    const request = new Request({
      buyerId,
      sellerId: resource.sellerId,
      resourceId,
      message,
      status: 'Pending'
    });

    await request.save();

    // Create notification for seller
    await Notification.create({
      userId: resource.sellerId,
      message: `New request received for ${resource.title}`,
      type: 'new_request',
      relatedId: request._id
    });

    res.status(201).json({ message: 'Request created successfully', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved', approvedDate: Date.now() },
      { new: true }
    ).populate('buyerId', 'name email').populate('resourceId', 'title');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update resource status
    await Resource.findByIdAndUpdate(request.resourceId, { status: 'Approved' });

    // Create notification for buyer
    await Notification.create({
      userId: request.buyerId,
      message: `Your request for "${request.resourceId.title}" has been approved`,
      type: 'request_approved',
      relatedId: request._id
    });

    res.json({ message: 'Request approved', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    ).populate('buyerId', 'name email').populate('resourceId', 'title');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Create notification for buyer
    await Notification.create({
      userId: request.buyerId,
      message: `Your request for "${request.resourceId.title}" has been rejected`,
      type: 'request_rejected',
      relatedId: request._id
    });

    res.json({ message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsShared = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'Shared', sharedDate: Date.now() },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update resource status
    await Resource.findByIdAndUpdate(request.resourceId, { status: 'Shared' });

    res.json({ message: 'Resource marked as shared', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsReturned = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'Returned', returnedDate: Date.now() },
      { new: true }
    ).populate('resourceId', '_id title');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update resource status back to Available
    await Resource.findByIdAndUpdate(request.resourceId._id, { status: 'Available' });

    // Create notification for seller
    await Notification.create({
      userId: request.sellerId,
      message: `"${request.resourceId.title}" has been returned`,
      type: 'resource_returned',
      relatedId: request._id
    });

    res.json({ message: 'Resource marked as returned', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSellerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sellerId: req.user.id })
      .populate('buyerId', 'name email phone')
      .populate('resourceId', 'title category')
      .sort({ requestDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBuyerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ buyerId: req.user.id })
      .populate('resourceId', 'title category image')
      .populate('sellerId', 'name email phone')
      .sort({ requestDate: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('buyerId', 'name email phone')
      .populate('sellerId', 'name email phone')
      .populate('resourceId', 'title category description image');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
