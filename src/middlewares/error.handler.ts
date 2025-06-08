import { Request, Response } from "express";
import { HttpError } from "../types";

const errorHandler = (err: HttpError, req: Request, res: Response) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Server Internal Error",
  });
};

export { errorHandler };
