import redis from '../config/redis.js';

export const loginRateLimiter = async (req, res, next) => {
  try {
    const key = `login:${req.ip}`;

    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, 60);
    }

    if (requests > 100) {
      return res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.',
      });
    }

    next();
  } catch (error) {
    next();
  }
};
