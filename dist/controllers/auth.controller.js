"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerAdmin = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_utils_1 = require("../utils/ApiError.utils");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const enum_types_1 = require("../@types/enum.types");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const sendEmailService_utils_1 = require("../utils/sendEmailService.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
const ENV_CONFIG_1 = __importDefault(require("../config/ENV_CONFIG"));
const uploader = "/profiles";
exports.registerAdmin = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, email, password } = req.body;
    const profile_image = req.file;
    // console.log(profile_image);
    if (!name) {
        throw new ApiError_utils_1.ApiError("Name is required", 400);
    }
    if (!email) {
        throw new ApiError_utils_1.ApiError("Email is required", 400);
    }
    if (!password) {
        throw new ApiError_utils_1.ApiError("Password is required", 400);
    }
    const userExist = await user_model_1.default.findOne({ email });
    if (userExist) {
        throw new ApiError_utils_1.ApiError("Admin is already exits", 401);
    }
    const user = new user_model_1.default({ name, email, password, role: enum_types_1.Role.ADMIN });
    const hashPass = await (0, bcrypt_utils_1.hash)(password);
    user.password = hashPass;
    if (profile_image) {
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(profile_image, uploader);
        user.profile_image = {
            path,
            public_id,
        };
    }
    await user.save();
    (0, sendEmailService_utils_1.sendMail)({
        to: user.email,
        subject: "account is created",
        html: (0, emailTemplate_utils_1.AccountCreatedEmailHtml)({
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        }),
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Admin Register Successfully",
        data: user,
        statusCode: 201,
    });
});
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError_utils_1.ApiError("Email is required", 404);
    }
    if (!password) {
        throw new ApiError_utils_1.ApiError("Password is required", 404);
    }
    const user = await user_model_1.default.findOne({ email: email }).select("+password");
    if (!user) {
        throw new ApiError_utils_1.ApiError("User not found", 404);
    }
    const ishassPass = await (0, bcrypt_utils_1.compare)(password, user.password);
    if (!ishassPass) {
        throw new ApiError_utils_1.ApiError("Invalid credentials", 404);
    }
    const access_token = (0, jwt_utils_1.generateJwtToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
    });
    res.cookie("access_token", access_token, {
        httpOnly: ENV_CONFIG_1.default.node_dev === "development" ? false : true,
        maxAge: Number(ENV_CONFIG_1.default.cookie_expiry ?? "7") * 24 * 60 * 60 * 1000,
        sameSite: ENV_CONFIG_1.default.node_dev === "development" ? "lax" : "none",
        secure: ENV_CONFIG_1.default.node_dev === "development" ? false : true,
    });
    (0, sendEmailService_utils_1.sendMail)({
        to: user.email,
        subject: "login successfully",
        html: (0, emailTemplate_utils_1.LoginEmailHtml)({
            name: user.name,
            email: user.email,
            loginAt: new Date(Date.now()),
        }),
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        data: {
            data: user,
            access_token,
        },
        message: "Login success",
        statusCode: 201,
    });
});
// export const getProfile = catchAsync(async (req: Request, res: Response) => {
//   const id = req.user._id;
//   const user = await User.findOne({ _id: id });
//   if (!user) {
//     throw new ApiError("profile not found", 404);
//   }
//   sendResponse(res, {
//     message: "profile fetched",
//     data: user,
//     statusCode: 200,
//   });
// });
exports.logout = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: ENV_CONFIG_1.default.node_dev === "development" ? false : true,
        maxAge: Date.now(),
        sameSite: ENV_CONFIG_1.default.node_dev === "development" ? "lax" : "none",
        secure: ENV_CONFIG_1.default.node_dev === "development" ? false : true,
    });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "logout successfully",
        data: null,
        statusCode: 200,
    });
});
