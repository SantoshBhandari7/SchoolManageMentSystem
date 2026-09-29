"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ApiError_utils_1 = require("../utils/ApiError.utils");
const uploader = () => {
    const folder = "uploads";
    const fileSize = 5 * 1024 * 1024;
    console.log(fs_1.default.existsSync(folder));
    if (!fs_1.default.existsSync(folder)) {
        fs_1.default.mkdirSync(folder, { recursive: true });
    }
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            const fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        },
    });
    const fileFilter = (req, file, cb) => {
        const allowed_extention = [".png", ".jpeg", ".jpg", ".svg", ".webp"];
        const mime_types = ["image/jpg", "image/jpeg", "image/jpg", "image/svg", "image/webp"];
        const file_ext = path_1.default.extname(file.originalname);
        console.log(file);
        if (!allowed_extention.includes(file_ext) || !mime_types.includes(file.mimetype)) {
            console.log(file);
            cb(new ApiError_utils_1.ApiError(`Invalid file format. only ${allowed_extention.join(",").replaceAll(".", "")}file are expected`, 422));
        }
        else {
            cb(null, true);
        }
    };
    const upload = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: fileSize,
        },
    });
    return upload;
};
exports.uploader = uploader;
