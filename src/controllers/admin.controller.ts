import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.utils";
import Student from "../models/student.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../@types/enum.types";
import { hash } from "../utils/bcrypt.utils";

export const getStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

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
    const { userId } = req.body;
    const student = await Student.findOne({ user: userId });
    const user = await User.findOne(userId);

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
      userId,
      name,
      email,
      password,
      rollno,
      address,
      parentName,
      parentPhone,
    } = req.body;

    const existstudent = await User.findOne({ email: email }).select(
      "-password",
    );

    if (!existstudent) {
      throw new ApiError("student is already exist", 404);
    }

    const user = new User({ name, email, password });

    const student = new Student({ address, rollno, parentName, parentPhone });

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


export const deleteStudnet = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
        const{userId}=req.body;

        const user =await User.findByIdAndDelete({userId});
        const student = await Student.findByIdAndDelete({user:userId});

        if(!user||!student){
                throw new ApiError("Student is not found", 404);
        }

        sendResponse(res,{
                message:"student Delete successful",
                data:null,
                statusCode:200,
        })


})