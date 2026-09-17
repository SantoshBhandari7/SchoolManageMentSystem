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

export const getStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const students = await Student.find();
    const users = await User.find();

    sendResponse(res, {
      message: "All students are fetched",
      data: students,
      statusCode: 200,
    });
  },
);

export const getStudnetById = catchAsync(
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
      rollno,
      address,
      parentName,
      parentPhone,
    } = req.body;
    // const profile_image = req.file;
    const { classname } = req.body;

    const existstudent = await User.findOne({ email: email }).select(
      "-password",
    );
    // const existClass = await Class.findOne({ classname });

    // if (!existClass) {
    //   throw new ApiError("Class is not found", 404);
    // }
    if (existstudent) {
      throw new ApiError("student is already exist", 404);
    }
    // console.log("Request received");

    const user = new User({ name, email, password, role: Role.STUDENT });

    const student = new Student({
      user: user._id,
      // class: existClass._id,
      gender,
      address,
      rollno,
      parentName,
      parentPhone,
    });

    const hashpass = await hash(password);
    user.password = hashpass;

    // if (profile_image) {
    //   // user.profile_image = profile_image.path;
    // }

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
    const { email, password, parentPhone, rollno, address } = req.body;
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
    if (rollno) student.rollno = rollno;

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
    const { oldpassword, newpassword } = req.body;
    const { userId } = req.params;

    const user = await User.findById({ userId }).select("+password");
    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    const ismatch = await bcrypt.compare(oldpassword, user.password);

    if (!ismatch) {
      throw new ApiError("Password is incorrect", 404);
    }

    const newhashpass = await hash(newpassword);
    user.password = newhashpass;

    await user.save();

    sendResponse(res, {
      message: "Password Change successfully",
      data: user,
      statusCode: 201,
    });
  },
);

export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById({ userId }).select("-password");
    const student = await Student.findOne({ user: userId });

    if (!student || !user) {
      throw new ApiError("Student not found", 404);
    }

    sendResponse(res, {
      message: "Your Record fetched",
      data: {
        student,
        User,
      },
      statusCode: 201,
    });
  },
);

export const deleteStudnet = catchAsync(
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
