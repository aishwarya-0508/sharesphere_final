import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getSellerAnalytics, getBuyerAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/seller', authMiddleware, getSellerAnalytics);
router.get('/buyer', authMiddleware, getBuyerAnalytics);

export default router;
