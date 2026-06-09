import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  createRequest,
  approveRequest,
  rejectRequest,
  markAsShared,
  markAsReturned,
  getSellerRequests,
  getBuyerRequests,
  getRequestById
} from '../controllers/requestController.js';

const router = express.Router();

router.post('/create', authMiddleware, createRequest);
router.get('/seller/all', authMiddleware, getSellerRequests);
router.get('/buyer/all', authMiddleware, getBuyerRequests);
router.get('/:id', authMiddleware, getRequestById);
router.put('/:id/approve', authMiddleware, approveRequest);
router.put('/:id/reject', authMiddleware, rejectRequest);
router.put('/:id/share', authMiddleware, markAsShared);
router.put('/:id/return', authMiddleware, markAsReturned);

export default router;
