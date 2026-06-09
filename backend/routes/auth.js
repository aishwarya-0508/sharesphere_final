import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { registerSeller, registerBuyer, login, logout, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-seller', registerSeller);
router.post('/register-buyer', registerBuyer);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/current-user', authMiddleware, getCurrentUser);

export default router;
