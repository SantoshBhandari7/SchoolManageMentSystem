"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const ENV_CONFIG_1 = __importDefault(require("./ENV_CONFIG"));
//api keys
cloudinary_1.v2.config({
    cloud_name: ENV_CONFIG_1.default.cloudinary_name,
    api_key: ENV_CONFIG_1.default.cloudinary_apikey,
    api_secret: ENV_CONFIG_1.default.cloudinary_secrete,
});
exports.default = cloudinary_1.v2;
