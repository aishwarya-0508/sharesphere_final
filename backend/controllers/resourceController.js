import Resource from '../models/Resource.js';
import Request from '../models/Request.js';
import Notification from '../models/Notification.js';

export const addResource = async (req, res) => {
  try {
    const { title, category, description, condition, contactInfo } = req.body;
    const sellerId = req.user.id;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const resource = new Resource({
      title,
      category,
      description,
      condition,
      contactInfo,
      image,
      sellerId
    });

    await resource.save();
    res.status(201).json({ message: 'Resource added successfully', resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const resources = await Resource.find(filter)
      .populate('sellerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('sellerId', 'name email phone');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const { title, category, description, condition, contactInfo } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { title, category, description, condition, contactInfo };
    if (image) updateData.image = image;

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource updated successfully', resource });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSellerResources = async (req, res) => {
  try {
    const resources = await Resource.find({ sellerId: req.user.id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
