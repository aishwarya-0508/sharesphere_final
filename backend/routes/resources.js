import express from 'express';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  addResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
  getSellerResources
} from '../controllers/resourceController.js';

const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), addResource);
router.get('/all', getAllResources);
router.get('/seller', authMiddleware, getSellerResources);
router.get('/:id', getResourceById);
router.put('/:id', authMiddleware, upload.single('image'), updateResource);
router.delete('/:id', authMiddleware, deleteResource);

export default router;
