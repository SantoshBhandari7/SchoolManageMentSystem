import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import { compare, hash } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../@types/enum.types";
import { upload } from "../utils/cloudinary.utils";
import { generateJwtToken } from "../utils/jwt.utils";

const uploader = "/profiles";

export const registerAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    const profile_image = req.file;
    console.log(profile_image);

    if (!name) {
      throw new ApiError("Name is required", 400);
    }
    if (!email) {
      throw new ApiError("Email is required", 400);
    }
    if (!password) {
      throw new ApiError("Password is required", 400);
    }

    const adminExist = await User.findOne({ email });

    if (adminExist) {
      throw new ApiError("Admin is already exits", 401);
    }

    const admin = new User({ name, email, password, role });

    const hashpass = await hash(password);
    admin.password = hashpass;

    if (profile_image) {
      // admin.profile_image = file.path;
      const { path, public_id } = await upload(profile_image, uploader);
      admin.profile_image = {
        path,
        public_id,
      };
    }

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

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isHassPass = await compare(password, user.password);

    if (!isHassPass) {
      throw new ApiError("Invalid credentials", 404);
    }

    const access_token = generateJwtToken({
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    sendResponse(res, {
      data: {
        data:user,
       access_token,
      },
      message: "Login success",
      statusCode: 201,
    });
  },
);
