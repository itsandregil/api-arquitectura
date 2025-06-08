import express from "express";
import rateLimit from "express-rate-limit";
import config from "./core/config";
import { errorHandler } from "./middlewares/error.handler";
import apiRouter from "./routes";

const app = express();

// Add a rate limiter to balance requests load
const limiter = rateLimit({
  windowMs: config.limiter.windowMs,
  limit: config.limiter.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use("/api", apiRouter);
app.use(errorHandler);

export default app;
