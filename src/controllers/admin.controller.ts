import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import Student from "../models/student.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../@types/enum.types";
import { hash } from "../utils/bcrypt.utils";
import Teacher from "../models/teacher.model";

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

    console.log("User ID:", userId);
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
      rollno,
      address,
      parentName,
      parentPhone,
    } = req.body;

    const existstudent = await User.findOne({ email: email }).select(
      "-password",
    );

    if (existstudent) {
      throw new ApiError("student is already exist", 404);
    }

    const user = new User({ name, email, password, role });

    const student = new Student({
      user: user._id,
      address,
      rollno,
      parentName,
      parentPhone,
    });

    const hashpass = await hash(password);
    user.password = hashpass;

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
    const { name, email, password, parentName, parentPhone, rollno, userId } =
      req.body;

    const user = await User.findOne({ userId }).select("+password");
    const student = await Student.findOne({ user: userId });

    if (!user || !student) {
      throw new ApiError("Student is not found", 404);
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (rollno) student.rollno = rollno;
    if (parentPhone) student.parentPhone = parentPhone;

    await user.save();
    await student.save();

    sendResponse(res, {
      message: "Studnet Record is updated",
      data: {
        user,
        student,
      },
      statusCode: 200,
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

export const getAllTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    const teachers = await Teacher.find();

    sendResponse(res, {
      message: "All teacher records is fetched",
      data: {
        users,
        teachers,
      },
      statusCode: 200,
    });
  },
);

export const createTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role, phone, subject, salary, address } =
      req.body;

    const existTeacher = await User.findOne({ email });

    if (existTeacher) {
      throw new ApiError("Teacher already exists", 404);
    }

    const user = new User({ name, email, password, role });
    const teacher = new Teacher({ phone, subject, salary, address });

    const hashpass = await hash(password);
    user.password = hashpass;

    user.save();
    teacher.save();

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

export const getTeacherById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    const teacher = await Teacher.findOne({ user: userId });

    if (!user && !teacher) {
      throw new ApiError("Teacher not found", 404);
    }

    sendResponse(res, {
      message: "tacher record is fetch",
      data: {
        user,
        teacher,
      },
      statusCode: 200,
    });
  },
);

export const updateTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const {
      email,
      password,
      role,
      phone,
      experiance,
      salary,
      address,
      subject,
    } = req.body;

    const user = await User.findById(userId);
    const teacher = await Teacher.findOne({ user: userId });

    if (!user || !teacher) {
      throw new ApiError("Teacher not found", 404);
    }

    if (email) user.email = email;
    if (password) user.password = password;
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
      message: "Delete successfull",
      data: {
        user,
        teacher,
      },
      statusCode: 201,
    });
  },
);
