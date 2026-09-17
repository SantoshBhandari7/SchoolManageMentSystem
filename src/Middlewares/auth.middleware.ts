import { NextFunction, Request, Response } from "express";
import { Role } from "../@types/enum.types";
import { ApiError } from "../utils/ApiError.utils";
import { verifyJwtToken } from "../utils/jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies["access_token"];

      if (!access_token) {
        throw new ApiError("Unauthorized, Access denied", 401);
      }
      const decoded_data = verifyJwtToken(access_token);

      if (!decoded_data) {
        throw new ApiError("Unauthorized, Access denied", 401);
      }

      if (decoded_data.exp * 1000 <= Date.now()) {
        throw new ApiError("Unauthorized, Token is expired", 401);
      }

      if (roles && !roles.includes(decoded_data.role)) {
        throw new ApiError("Unauthorized, Access denied", 403);
      }

      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        name: decoded_data.name,
        role: decoded_data.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
