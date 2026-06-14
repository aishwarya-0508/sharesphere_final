import Request from "../models/Request.js";
import Resource from "../models/Resource.js";

export const createRequest = async (req, res) => {
  try {
    const resource = await Resource.findById(
      req.params.resourceId
    );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    const request = await Request.create({
      resourceId: resource._id,
      buyerId: req.user.id,
      sellerId: resource.sellerId,
    });

    res.status(201).json({
      success: true,
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