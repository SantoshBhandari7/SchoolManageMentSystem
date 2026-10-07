import { Response } from "express";

type TSendResponse<T> = {
  message: string;
  statusCode: number;
  data: T;
};

export const sendResponse = <T>(
  res: Response,
  { message, statusCode, data }: TSendResponse<T>,
) => {
  return res.status(statusCode).json({
    message,
    data,
    success: String(statusCode).startsWith("2"),
    status: String(statusCode).startsWith("2")
      ? "success"
      : String(statusCode).startsWith("4")
        ? "fail"
        : "error",
  });
};
