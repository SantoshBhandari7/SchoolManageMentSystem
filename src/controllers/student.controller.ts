import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Student from "../models/student.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import User from "../models/user.model";

export const getStudnet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    const student = await Student.findOne({ user: userId });

    if (!student) {
      throw new ApiError("Studnet is not found", 404);
    }

    sendResponse(res, {
      message: "Studnet record is fetched",
      statusCode: 200,
      data: student,
    });
  },
);

export const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
        const {name, email ,password, parentName, parentPhone,address,userId } =req.body;

        const user = await User.findOne({user:userId});
        const student = await Student.findOne({user:userId});
        

        if(!student){
                throw new ApiError("Student is not found",404);
        }

        // if(name) user.name= name;
        // if(parentName) student.parentName=parentName;


  
}
);
