import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginRateLimiter, login);
router.post('/logout', logout);

export default router;
