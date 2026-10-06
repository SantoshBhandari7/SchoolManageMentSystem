"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.updateSubjectRecord = exports.createSubject = exports.getSubjectById = exports.getAllSubject = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const subject_models_1 = __importDefault(require("../models/subject.models"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const ApiError_utils_1 = require("../utils/ApiError.utils");
const teacher_model_1 = __importDefault(require("../models/teacher.model"));
const class_models_1 = __importDefault(require("../models/class.models"));
const withPagination_utils_1 = require("../utils/withPagination.utils");
exports.getAllSubject = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, } = req.query;
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    const filter = {};
    if (query) {
        filter.$or = [
            {
                subjectname: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                credithour: {
                    $regex: query,
                    $options: "i",
                },
            },
        ];
    }
    const subjects = await subject_models_1.default.find(filter)
        .populate({
        path: "teacher",
        populate: {
            path: "user",
            select: "name",
        },
    })
        .populate("program", "name")
        .populate("class", "classname")
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await subject_models_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "All Subjects fetch",
        data: {
            subjects,
            pagination: (0, withPagination_utils_1.getPagination)(total_count, perPage, currentPage),
        },
        statusCode: 200,
    });
});
exports.getSubjectById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const subject = await subject_models_1.default.findById(id);
    if (!subject) {
        throw new ApiError_utils_1.ApiError("Subject not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Subject record fetch",
        data: subject,
        statusCode: 200,
    });
});
exports.createSubject = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { subjectname, credithour, teacherId, classId } = req.body;
    const existSubject = await subject_models_1.default.findOne({ subjectname });
    // const existTeacher = await Teacher.findById(teacherId);
    // const existClass = await Class.findById(classId);
    if (existSubject) {
        throw new ApiError_utils_1.ApiError("Subject already exist", 404);
    }
    // if (!existTeacher) {
    //   throw new ApiError("Teacher is not assign", 404);
    // }
    // if (!existClass) {
    //   throw new ApiError("Class is not assign", 404);
    // }
    const subject = new subject_models_1.default({
        subjectname,
        credithour,
        teacher: teacherId,
        class: classId,
    });
    await subject.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Subject created successfully",
        data: subject,
        statusCode: 201,
    });
});
exports.updateSubjectRecord = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { subjectname, credithour, teacherId, classId } = req.body;
    const subject = await subject_models_1.default.findById(id);
    const teacherrecord = await teacher_model_1.default.findById(teacherId);
    const classrecord = await class_models_1.default.findById(classId);
    if (!subject) {
        throw new ApiError_utils_1.ApiError("Subject not found", 404);
    }
    if (!teacherrecord) {
        throw new ApiError_utils_1.ApiError("teacher not found", 404);
    }
    if (!classrecord) {
        throw new ApiError_utils_1.ApiError("class not found", 404);
    }
    if (subjectname)
        subject.subjectname = subjectname;
    if (classId)
        subject.class = classrecord._id;
    if (teacherId)
        subject.teacher = teacherrecord._id;
    if (credithour)
        subject.credithour = credithour;
    await subject.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Subject Updated",
        data: subject,
        statusCode: 201,
    });
});
exports.deleteSubject = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const subject = await subject_models_1.default.findByIdAndDelete(id);
    if (!subject) {
        throw new ApiError_utils_1.ApiError("Student not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Subject record deleted",
        data: null,
        statusCode: 200,
    });
});
