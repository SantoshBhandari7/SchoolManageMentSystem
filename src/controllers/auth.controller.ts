import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import { compare, hash } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../@types/enum.types";

export const registerAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    const adminExist = await User.findOne({role:Role.ADMIN});

    if (adminExist) {
      throw new ApiError("Admin is already exits", 401);
    }

    const admin = new User({ name, email, password, role});

    const hashpass = await hash(password);
    admin.password = hashpass;

    await admin.save();

    sendResponse(res, {
      message: "Admin Regester Successfully",
      data: admin,
      statusCode: 201,
    });
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      throw new ApiError("Email is required", 404);
    }
    if (!password) {
      throw new ApiError("Password is required", 404);
    }

    const user = await User.findOne({ email:email}).select("+password");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isHassPass = await compare(password, user.password);

    if (!isHassPass) {
      throw new ApiError("Invalid credentials", 404);
    }

    sendResponse(res, {
      data: user,
      message: "Login success",
      statusCode: 201,
    });
  },
);
