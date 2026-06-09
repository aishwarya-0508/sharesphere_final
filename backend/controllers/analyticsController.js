import Resource from '../models/Resource.js';
import Request from '../models/Request.js';

export const getSellerAnalytics = async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Total resources
    const totalResources = await Resource.countDocuments({ sellerId });

    // Resources by status
    const availableResources = await Resource.countDocuments({ sellerId, status: 'Available' });
    const requestedResources = await Resource.countDocuments({ sellerId, status: 'Requested' });
    const approvedResources = await Resource.countDocuments({ sellerId, status: 'Approved' });
    const sharedResources = await Resource.countDocuments({ sellerId, status: 'Shared' });

    // Request statistics
    const totalRequests = await Request.countDocuments({ sellerId });
    const approvedRequests = await Request.countDocuments({ sellerId, status: 'Approved' });
    const rejectedRequests = await Request.countDocuments({ sellerId, status: 'Rejected' });
    const pendingRequests = await Request.countDocuments({ sellerId, status: 'Pending' });

    // Resources by category
    const resourcesByCategory = await Resource.aggregate([
      { $match: { sellerId: { $oid: sellerId } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Monthly requests (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyRequests = await Request.aggregate([
      {
        $match: {
          sellerId: { $oid: sellerId },
          requestDate: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$requestDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalResources,
      availableResources,
      requestedResources,
      approvedResources,
      sharedResources,
      totalRequests,
      approvedRequests,
      rejectedRequests,
      pendingRequests,
      resourcesByCategory,
      monthlyRequests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBuyerAnalytics = async (req, res) => {
  try {
    const buyerId = req.user.id;

    // Request statistics
    const totalRequests = await Request.countDocuments({ buyerId });
    const approvedRequests = await Request.countDocuments({ buyerId, status: 'Approved' });
    const rejectedRequests = await Request.countDocuments({ buyerId, status: 'Rejected' });
    const pendingRequests = await Request.countDocuments({ buyerId, status: 'Pending' });
    const sharedResources = await Request.countDocuments({ buyerId, status: 'Shared' });
    const returnedResources = await Request.countDocuments({ buyerId, status: 'Returned' });

    // Monthly request history
    const monthlyRequests = await Request.aggregate([
      { $match: { buyerId: { $oid: buyerId } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$requestDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Request status distribution
    const requestStatusDistribution = await Request.aggregate([
      { $match: { buyerId: { $oid: buyerId } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalRequests,
      approvedRequests,
      rejectedRequests,
      pendingRequests,
      sharedResources,
      returnedResources,
      monthlyRequests,
      requestStatusDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
