import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import limiter from "./core/rateLimiter";
import { apiSpec } from "./core/swagger";
import { errorHandler } from "./middlewares/error.handler";
import apiRouter from "./routes";

const app = express();

// Add rate limiter and other middlewares
app.use(express.json());
app.use(limiter);

// Add routes
app.use("/api", apiRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

// Redirect from index to documentation
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.redirect(301, "/docs");
});

// Add error handlers
app.use(errorHandler);

export default app;
