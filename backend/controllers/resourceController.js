import Resource from "../models/Resource.js";

// Add Resource
export const addResource = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    const resource = await Resource.create({
      title,
      description,
      category,
      location,
      sellerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      resource,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();

    console.log("All Resources:", resources);

    res.json({
      success: true,
      resources,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Seller Resources
export const getSellerResources = async (req, res) => {
  try {

    console.log("DECODED USER:", req.user);
    console.log("Logged User:", req.user.id);

    const resources = await Resource.find({
      sellerId: req.user.id,
    });

    console.log("Resources Found:", resources);

    res.json({
      success: true,
      resources,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Resource
export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Resource
export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    if (resource.sellerId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Resource
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    if (resource.sellerId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Resource Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};