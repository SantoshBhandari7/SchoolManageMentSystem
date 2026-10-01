"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgram = exports.updateProgram = exports.createProgram = exports.getProgramById = exports.getProgram = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const program_model_1 = __importDefault(require("../models/program.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const ApiError_utils_1 = require("../utils/ApiError.utils");
exports.getProgram = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const programs = await program_model_1.default.find();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Programs are fetched success",
        data: programs,
        statusCode: 200,
    });
});
exports.getProgramById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const program = await program_model_1.default.findById(id);
    if (!program) {
        throw new ApiError_utils_1.ApiError("Program  not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "program fetch",
        data: program,
        statusCode: 200,
    });
});
exports.createProgram = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    // const { id } = req.params;
    const { name, description, duration, eligibility } = req.body;
    const program = await program_model_1.default.findOne({ name });
    if (program) {
        throw new ApiError_utils_1.ApiError("Program already exist", 404);
    }
    const newProgram = new program_model_1.default({
        name,
        description,
        duration,
        eligibility,
    });
    await newProgram.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Program created successfully",
        data: newProgram,
        statusCode: 201,
    });
});
exports.updateProgram = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, duration, eligibility } = req.body;
    const program = await program_model_1.default.findById(id);
    if (!program) {
        throw new ApiError_utils_1.ApiError("Program not found", 404);
    }
    if (name)
        program.name = name;
    if (description)
        program.description = description;
    if (duration)
        program.duration = duration;
    if (eligibility)
        program.eligibility = eligibility;
    await program.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Program Updated successfully",
        data: program,
        statusCode: 201,
    });
});
exports.deleteProgram = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const program = await program_model_1.default.findByIdAndDelete(id);
    if (!program) {
        throw new ApiError_utils_1.ApiError("Program not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "program deleted successfully",
        data: null,
        statusCode: 200,
    });
});
