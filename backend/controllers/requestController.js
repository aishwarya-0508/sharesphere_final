import Request from "../models/Request.js";
import Resource from "../models/Resource.js";

export const createRequest = async (req, res) => {
  try {
    if (req.user.role !== "Buyer") {
      return res.status(403).json({
        message: "Only buyers can request resources",
      });
    }

    const resource = await Resource.findById(
      req.params.resourceId
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    if (resource.status !== "Available") {
      return res.status(409).json({
        message: "This resource is not available",
      });
    }

    const existingRequest = await Request.findOne({
      resourceId: resource._id,
      buyerId: req.user.id,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You already requested this resource",
      });
    }

    const request = await Request.create({
      resourceId: resource._id,
      buyerId: req.user.id,
      sellerId: resource.sellerId,
    });

    res.status(201).json({
      success: true,
      message: "Resource request sent to the seller",
      request,
    });
  } 
  catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getSellerRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      sellerId: req.user.id,
    })
      .populate("buyerId", "name email")
      .populate("resourceId", "title category");

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== "Seller") {
      return res.status(403).json({
        message: "Only sellers can update requests",
      });
    }

    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Approved or Rejected",
      });
    }

    const request = await Request.findOne({
      _id: req.params.requestId,
      sellerId: req.user.id,
    });

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(409).json({
        message: "This request has already been processed",
      });
    }

    if (status === "Approved") {
      const resource = await Resource.findOneAndUpdate(
        {
          _id: request.resourceId,
          status: "Available",
        },
        { status: "Unavailable" },
        { new: true }
      );

      if (!resource) {
        return res.status(409).json({
          message: "This resource is no longer available",
        });
      }
    }

    request.status = status;
    await request.save();

    res.json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};