import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Student from "../models/student.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { hash } from "../utils/bcrypt.utils";
import { Role } from "../@types/enum.types";
import Class from "../models/class.models";
import { upload } from "../utils/cloudinary.utils";
import { getPagination } from "../utils/withPagination.utils";

const uploader = "/profiles";

export const getStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      order = "DESC",
      sortBy = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const filter: any = {};
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

    const students = await Student.find(filter)
      .limit(perPage)
      .skip(skip)
      .sort({
        [sortBy as string]: order === "DESC" ? -1 : 1,
      });

    const total_count = await Student.countDocuments(filter);
    const users = await User.find();

    sendResponse(res, {
      message: "All students are fetched",
      data: {
        students,
        pagination: getPagination(total_count, perPage, currentPage),
      },
      statusCode: 200,
    });
  },
);

export const getStudentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const student = await Student.findOne({ user: userId });
    const user = await User.findById(userId);

    // console.log("User ID:", userId);
    if (!student || !user) {
      throw new ApiError("student is not found", 404);
    }

    sendResponse(res, {
      message: "Student fetched",
      data: {
        student,
        user,
      },
      statusCode: 200,
    });
  },
);

export const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      password,
      role,
      gender,
      roll_no,
      address,
      parentName,
      parentPhone,
    } = req.body;
    const profile_image = req.file;
    const { classname } = req.body;

    const existStudent = await User.findOne({ email: email }).select(
      "-password",
    );
    const existClass = await Class.findOne({ classname });

    if (!existClass) {
      throw new ApiError("Class is not found", 404);
    }
    if (existStudent) {
      throw new ApiError("student is already exist", 404);
    }

    const user = new User({ name, email, password, role: Role.STUDENT });

    const student = new Student({
      user: user._id,
      class: existClass._id,
      gender,
      address,
      roll_no,
      parentName,
      parentPhone,
    });

    const hashPass = await hash(password);
    user.password = hashPass;

    if (profile_image) {
      const { path, public_id } = await upload(profile_image, uploader);
      user.profile_image = {
        path,
        public_id,
      };
    }

    await user.save();
    await student.save();

    sendResponse(res, {
      message: "Student created successfully",
      data: {
        user,
        student,
      },
      statusCode: 201,
    });
  },
);

export const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, parentPhone, roll_no, address } = req.body;
    const { userId } = req.params;

    const user = await User.findById({ userId });
    const student = await Student.findOne({ user: userId });

    if (!student) {
      throw new ApiError("Student is not found", 404);
    }
    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    if (password) user.password = password;
    if (email) user.email = email;
    if (parentPhone) student.parentPhone = parentPhone;
    if (address) student.address = address;
    if (roll_no) student.roll_no = roll_no;

    await user.save();
    await student.save();

    sendResponse(res, {
      message: "Update record Successfully",
      data: {
        student,
        user,
      },
      statusCode: 201,
    });
  },
);

export const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;

    const user = await User.findById({ userId }).select("+password");
    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new ApiError("Password is incorrect", 404);
    }

    const newHashPass = await hash(newPassword);
    user.password = newHashPass;

    await user.save();

    sendResponse(res, {
      message: "Password Change successfully",
      data: user,
      statusCode: 201,
    });
  },
);

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

export const deleteStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    const user = await User.findByIdAndDelete({ userId });
    const student = await Student.findByIdAndDelete({ user: userId });

    if (!user || !student) {
      throw new ApiError("Student is not found", 404);
    }

    sendResponse(res, {
      message: "student Delete successful",
      data: null,
      statusCode: 200,
    });
  },
);
