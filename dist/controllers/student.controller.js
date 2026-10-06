"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.changePassword = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudent = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const student_model_1 = __importDefault(require("../models/student.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const ApiError_utils_1 = require("../utils/ApiError.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const enum_types_1 = require("../@types/enum.types");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const withPagination_utils_1 = require("../utils/withPagination.utils");
const uploader = "/profiles";
exports.getStudent = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, } = req.query;
    const filter = {};
    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $option: "i",
                },
            },
            {
                roll_no: {
                    $regex: query,
                    $option: "i",
                },
            },
        ];
    }
    const students = await student_model_1.default.find(filter)
        .populate("user", "name email")
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const total_count = await student_model_1.default.countDocuments(filter);
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "All students are fetched",
        data: {
            students,
            pagination: (0, withPagination_utils_1.getPagination)(total_count, perPage, currentPage),
        },
        statusCode: 200,
    });
});
exports.getStudentById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.params;
    const student = await student_model_1.default.findOne({ user: userId });
    const user = await user_model_1.default.findById(userId);
    // console.log("User ID:", userId);
    if (!student || !user) {
        throw new ApiError_utils_1.ApiError("student is not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Student fetched",
        data: {
            student,
            user,
        },
        statusCode: 200,
    });
});
exports.createStudent = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, email, password, role, gender, roll_no, address, parentName, parentPhone, } = req.body;
    const profile_image = req.file;
    const { classname } = req.body;
    const existStudent = await user_model_1.default.findOne({ email: email }).select("-password");
    // const existClass = await Class.findOne({ classname });
    // if (!existClass) {
    //   throw new ApiError("Class is not found", 404);
    // }
    if (existStudent) {
        throw new ApiError_utils_1.ApiError("student is already exist", 404);
    }
    const user = new user_model_1.default({ name, email, password, role: enum_types_1.Role.STUDENT });
    const student = new student_model_1.default({
        user: user._id,
        // class: existClass._id,
        gender,
        address,
        roll_no,
        parentName,
        parentPhone,
    });
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
    await student.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Student created successfully",
        data: {
            user,
            student,
        },
        statusCode: 201,
    });
});
exports.updateStudent = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password, parentPhone, roll_no, address } = req.body;
    const { userId } = req.params;
    const user = await user_model_1.default.findById({ userId });
    const student = await student_model_1.default.findOne({ user: userId });
    if (!student) {
        throw new ApiError_utils_1.ApiError("Student is not found", 404);
    }
    if (!user) {
        throw new ApiError_utils_1.ApiError("User is not found", 404);
    }
    if (password)
        user.password = password;
    if (email)
        user.email = email;
    if (parentPhone)
        student.parentPhone = parentPhone;
    if (address)
        student.address = address;
    if (roll_no)
        student.roll_no = roll_no;
    await user.save();
    await student.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Update record Successfully",
        data: {
            student,
            user,
        },
        statusCode: 201,
    });
});
exports.changePassword = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;
    const user = await user_model_1.default.findById({ userId }).select("+password");
    if (!user) {
        throw new ApiError_utils_1.ApiError("User is not found", 404);
    }
    const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new ApiError_utils_1.ApiError("Password is incorrect", 404);
    }
    const newHashPass = await (0, bcrypt_utils_1.hash)(newPassword);
    user.password = newHashPass;
    await user.save();
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Password Change successfully",
        data: user,
        statusCode: 201,
    });
});
// export const getProfile = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId } = req.params;
//     const user = await User.findById({ userId }).select("-password");
//     const student = await Student.findOne({ user: userId });
//     if (!student || !user) {
//       throw new ApiError("Student not found", 404);
//     }
//     sendResponse(res, {
//       message: "Your Record fetched",
//       data: {
//         student,
//         User,
//       },
//       statusCode: 201,
//     });
//   },
// );
exports.deleteStudent = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { userId } = req.body;
    const user = await user_model_1.default.findByIdAndDelete({ userId });
    const student = await student_model_1.default.findByIdAndDelete({ user: userId });
    if (!user || !student) {
        throw new ApiError_utils_1.ApiError("Student is not found", 404);
    }
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "student Delete successful",
        data: null,
        statusCode: 200,
    });
});
