"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ENV_CONFIG_1 = __importDefault(require("../config/ENV_CONFIG"));
const errorHandler = (error, req, res, next) => {
    const statusCode = error?.statusCode ?? 500;
    const message = error?.message ?? "Internal Server Error";
    const success = error?.success ?? false;
    const status = error?.status ?? "error";
    res.status(statusCode).json({
        message,
        success,
        status,
        data: null,
        stack: ENV_CONFIG_1.default.node_dev === "development" ? error?.stack : null,
    });
};
exports.errorHandler = errorHandler;
