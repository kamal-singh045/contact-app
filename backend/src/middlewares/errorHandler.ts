import { Request, Response, NextFunction } from "express";

const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error Handler Middleware");
  const errorMessage = err.message || "Something went wrong";
  return res.status(500).send({ success: false, message: errorMessage });
};

export default errorHandler;
