import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import { compare, hash } from "../utils/bcrypt.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../@types/enum.types";
import { upload } from "../utils/cloudinary.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import { sendMail } from "../utils/sendEmailService.utils";
import {
  AccountCreatedEmailHtml,
  LoginEmailHtml,
} from "../utils/emailTemplate.utils";
import Env_Config from "../config/ENV_CONFIG";

const uploader = "/profiles";

export const registerAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
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

    const admin = new User({ name, email, password, role: Role.ADMIN });

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

    sendMail({
      to: admin.email,
      subject: "account is created",
      html: AccountCreatedEmailHtml({
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
      }),
    });

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

    sendMail({
      to: user.email,
      subject: "login successfully",
      html: LoginEmailHtml({
        name: user.name,
        email: user.email,
        loginAt: new Date(Date.now()),
      }),
    });

    sendResponse(res, {
      data: {
        data: user,
        access_token,
      },
      message: "Login success",
      statusCode: 201,
    });
  },
);

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.user._id;
  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new ApiError("profile not found", 404);
  }

  sendResponse(res, {
    message: "profile fetched",
    data: user,
    statusCode: 200,
  });
});

export const logout = catchAsync(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: Env_Config.node_dev === "development" ? false : true,
    maxAge: Date.now(),
    sameSite: Env_Config.node_dev === "development" ? "lax" : "none",
    secure: Env_Config.node_dev === "development" ? false : true,
  });

  sendResponse(res, {
    message: "logout successfully",
    data: null,
    statusCode: 200,
  });
});
