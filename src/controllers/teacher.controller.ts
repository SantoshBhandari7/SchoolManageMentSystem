import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { hash } from "../utils/bcrypt.utils";
import Teacher from "../models/teacher.model";
import { Role } from "../@types/enum.types";
import { upload } from "../utils/cloudinary.utils";
import { getPagination } from "../utils/withPagination.utils";

const uploader = "/profiles";

export const getAllTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      limit = 10,
      page = 1,
      order = "DESC",
      sortBy = "createdAt",
    } = req.query;

    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);

    const filter: any = {};

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

    const teachers = await Teacher.find(filter)
      .populate("user", "name email")
      .limit(perPage)
      .skip(skip)
      .sort({
        [sortBy as string]: order === "DESC" ? -1 : 1,
      });

    const total_count = await Teacher.countDocuments(filter);
    sendResponse(res, {
      message: "All teacher records is fetched",
      data: {
        pagination: getPagination(total_count, perPage, currentPage),
        teachers,
      },
      statusCode: 200,
    });
  },
);

export const getTeacherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    const teacher = await Teacher.findOne({ user: userId });

    if (!user && !teacher) {
      throw new ApiError("Teacher not found", 404);
    }

    sendResponse(res, {
      message: "teacher record is fetch",
      data: {
        user,
        teacher,
      },
      statusCode: 200,
    });
  },
);

export const createTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, gender, phone, subject, salary, address } =
      req.body;
    const profile_image = req.file;

    const existTeacher = await User.findOne({ email });

    if (existTeacher) {
      throw new ApiError("Teacher already exists", 404);
    }

    const user = new User({ name, email, password, role: Role.TEACHER });
    const teacher = new Teacher({
      user: user._id,
      phone,
      subject,
      gender,
      salary,
      address,
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
    await teacher.save();

    sendResponse(res, {
      message: "Teacher is created",
      data: {
        user,
        teacher,
      },
      statusCode: 201,
    });
  },
);

export const updateTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { email, password, phone, experience, salary, address, subject } =
      req.body;

    const user = await User.findById(userId);
    const teacher = await Teacher.findOne({ user: userId });

    if (!user || !teacher) {
      throw new ApiError("Teacher not found", 404);
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (experience) teacher.experience = experience;
    if (subject) teacher.subject = subject;
    if (phone) teacher.phone = phone;
    if (salary) teacher.salary = salary;
    if (address) teacher.address = address;

    sendResponse(res, {
      message: "Teacher record is updated successfully",
      data: {
        user,
        teacher,
      },
      statusCode: 201,
    });
  },
);

export const deleteTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    const teacher = await Teacher.findByIdAndUpdate({ user: userId });

    if (!user || !teacher) {
      throw new ApiError("teacher not found", 404);
    }

    sendResponse(res, {
      message: "Delete successfully",
      data: {
        user,
        teacher,
      },
      statusCode: 201,
    });
  },
);
