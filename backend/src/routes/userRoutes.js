import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Protected route accessed',
    user: req.user,
  });
});

export default router;
