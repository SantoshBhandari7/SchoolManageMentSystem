"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.upload = void 0;
const fs_1 = __importDefault(require("fs"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const ApiError_utils_1 = require("./ApiError.utils");
// import { apiError } from "./apiError.utils";
const upload = async (file, dir = "/") => {
    try {
        const folder = "/firstbackendproject" + dir;
        const { secure_url, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            unique_filename: true,
            folder: folder,
            transformation: {
                width: 1000,
                height: 1000,
                crop: "fill",
                fetch_format: "auto",
                format: "auto",
                gravity: "face",
            },
        });
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            path: secure_url,
            public_id,
        };
    }
    catch (error) {
        console.log(error);
        throw new ApiError_utils_1.ApiError("upload error", 500);
    }
};
exports.upload = upload;
const removeFile = async (public_id) => {
    try {
        await cloudinary_config_1.default.uploader.destroy(public_id);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new ApiError_utils_1.ApiError("Something went wrong", 500);
    }
};
exports.removeFile = removeFile;
