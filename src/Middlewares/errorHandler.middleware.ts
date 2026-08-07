import { NextFunction, Request, Response } from "express";
import Env_Config from "../config/ENV_CONFIG";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = error?.statusCode ?? 500;
  const message: string = error?.message ?? "Internal Server Error";
  const success: boolean = error?.success ?? false;
  const status: "error" | "success" | "fail" = error?.status ?? "error";

  res.status(statusCode).json({
    message,
    success,
    status,
    data: null,
    stack: Env_Config.node_dev === "development" ? error?.stack : null,
  });
};
