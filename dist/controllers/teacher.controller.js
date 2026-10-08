"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTeacherProfile = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacherById = exports.getAllTeacher = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_utils_1 = require("../utils/ApiError.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const enum_types_1 = require("../@types/enum.types");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const withPagination_utils_1 = require("../utils/withPagination.utils");
const uploader = "/profiles";
exports.getAllTeacher = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, limit = 10, page = 1, order = "DESC", sortBy = "createdAt", } = req.query;
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    const filter = {};
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                subject: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                experience: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    const teachers = await teacher_model_1.default.find(filter)
        .populate("user", "name email")
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await teacher_model_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "All teacher records is fetched",
        data: {
            pagination: (0, withPagination_utils_1.getPagination)(total_count, perPage, currentPage),
            teachers,
        },
        statusCode: 200,
    });
});
exports.getTeacherById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.params;
    const user = await user_model_1.default.findById(userId);
    const teacher = await teacher_model_1.default.findOne({ user: userId });
    if (!user && !teacher) {
        throw new ApiError_utils_1.ApiError("Teacher not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "teacher record is fetch",
        data: {
            user,
            teacher,
        },
        statusCode: 200,
    });
});
exports.createTeacher = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, email, password, gender, phone, subject, salary, address, experience, } = req.body;
    const profile_image = req.file;
    const existTeacher = await user_model_1.default.findOne({ email });
    if (existTeacher) {
        throw new ApiError_utils_1.ApiError("Teacher already exists", 404);
    }
    const user = new user_model_1.default({ name, email, password, role: enum_types_1.Role.TEACHER });
    const teacher = new teacher_model_1.default({
        user: user._id,
        phone,
        subject,
        gender,
        salary,
        address,
        experience,
    });
    const hashPass = await (0, bcrypt_utils_1.hash)(password);
    user.password = hashPass;
    if (profile_image) {
        const { path, public_id } = await (0, cloudinary_utils_1.upload)(profile_image, uploader);
        teacher.profile_image = {
            path,
            public_id,
        };
    }
    await user.save();
    await teacher.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Teacher is created",
        data: {
            user,
            teacher,
        },
        statusCode: 201,
    });
});
exports.updateTeacher = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.params;
    const { email, password, phone, experience, salary, address, subject } = req.body;
    const user = await user_model_1.default.findById(userId);
    const teacher = await teacher_model_1.default.findOne({ user: userId });
    if (!user || !teacher) {
        throw new ApiError_utils_1.ApiError("Teacher not found", 404);
    }
    if (email)
        user.email = email;
    if (password)
        user.password = password;
    if (experience)
        teacher.experience = experience;
    if (subject)
        teacher.subject = subject;
    if (phone)
        teacher.phone = phone;
    if (salary)
        teacher.salary = salary;
    if (address)
        teacher.address = address;
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Teacher record is updated successfully",
        data: {
            user,
            teacher,
        },
        statusCode: 201,
    });
});
exports.deleteTeacher = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.params;
    const user = await user_model_1.default.findByIdAndDelete(userId);
    const teacher = await teacher_model_1.default.findByIdAndUpdate({ user: userId });
    if (!user || !teacher) {
        throw new ApiError_utils_1.ApiError("teacher not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Delete successfully",
        data: {
            user,
            teacher,
        },
        statusCode: 201,
    });
});
exports.getMyTeacherProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const userId = req.user._id;
    const teacher = await teacher_model_1.default.findOne({
        user: userId,
    }).populate("user", "name email role");
    if (!teacher) {
        throw new ApiError_utils_1.ApiError("Teacher profile not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Teacher profile fetched successfully",
        data: {
            teacher,
        },
    });
});
