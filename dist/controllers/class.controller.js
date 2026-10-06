"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.createClass = exports.getClassById = exports.getAllClass = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const class_models_1 = __importDefault(require("../models/class.models"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const ApiError_utils_1 = require("../utils/ApiError.utils");
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const withPagination_utils_1 = require("../utils/withPagination.utils");
exports.getAllClass = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, limit = 10, order = "DESC", sortBy = "createdAt", page = 1, } = req.query;
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    const filter = {};
    if (query) {
        filter.$or = [
            {
                className: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                section: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    const classRecord = await class_models_1.default.find(filter)
        .populate({
        path: "teacher",
        populate: {
            path: "subject",
            select: "subjectname",
        },
    })
        .limit(perPage)
        .skip(skip)
        .sort({ [sortBy]: order === "DESC" ? -1 : 1 });
    const total_count = await class_models_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "All Class Record Fetch",
        data: {
            classRecord,
            pagination: (0, withPagination_utils_1.getPagination)(total_count, perPage, currentPage),
        },
        statusCode: 200,
    });
});
exports.getClassById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const classById = await class_models_1.default.findById(id);
    if (!classById) {
        throw new ApiError_utils_1.ApiError("Class not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "class record fetch",
        data: classById,
        statusCode: 200,
    });
});
exports.createClass = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { classname, section, room_no, teacherId } = req.body;
    const existClass = await class_models_1.default.findOne({ classname, section });
    // const existTeacher = await Teacher.findById(teacherId);
    if (existClass) {
        throw new ApiError_utils_1.ApiError("class already exist", 404);
    }
    const newClass = new class_models_1.default({
        classname,
        section,
        room_no,
        teacher: teacherId,
    });
    await newClass.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Class record created",
        data: newClass,
        statusCode: 201,
    });
});
exports.updateClass = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { classname, room_no, teacherId, section } = req.body;
    const classRecord = await class_models_1.default.findById(id);
    const teacher = await teacher_model_1.default.findById(teacherId);
    if (!classRecord) {
        throw new ApiError_utils_1.ApiError("class is not found", 404);
    }
    if (!teacher) {
        throw new ApiError_utils_1.ApiError("teacher not found", 404);
    }
    if (classname)
        classRecord.classname = classname;
    if (room_no)
        classRecord.room_no = room_no;
    if (section)
        classRecord.section = section;
    if (teacherId)
        classRecord.teacher = teacher._id;
    await classRecord.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Class record updated",
        data: classRecord,
        statusCode: 201,
    });
});
exports.deleteClass = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const classRecord = await class_models_1.default.findByIdAndDelete(id);
    if (!classRecord) {
        throw new ApiError_utils_1.ApiError("Class not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "class record deleted",
        data: null,
        statusCode: 200,
    });
});
