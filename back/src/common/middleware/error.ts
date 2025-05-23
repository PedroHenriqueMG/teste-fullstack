import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-erros";

export const errosMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error: ", error);
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal server error";
  res.status(statusCode).json({ message });
  return;
};
