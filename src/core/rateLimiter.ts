import rateLimit from "express-rate-limit";
import config from "./config";

// Add a rate limiter to balance requests load
const limiter = rateLimit({
  windowMs: config.limiter.windowMs,
  limit: config.limiter.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
