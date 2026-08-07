import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Student from "../models/student.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { hash } from "../utils/bcrypt.utils";

// export const getStudent = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { userId } = req.params;

//     const student = await Student.findOne({user: userId });

//     if (!student) {
//       throw new ApiError("Studnet is not found", 404);
//     }

//     sendResponse(res, {
//       message: "Studnet record is fetched",
//       statusCode: 200,
//       data: student,
//     });
//   },
// );

export const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, parentName, parentPhone, address} =
      req.body;
    const { userId } = req.params;

    const user = await User.findById({userId });
    const student = await Student.findOne({ user: userId });

    if (!student) {
      throw new ApiError("Student is not found", 404);
    }
    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (parentName) student.parentName = parentName;
    if (parentPhone) student.parentPhone = parentPhone;
    if (address) student.address = address;

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
    const { oldpassword, newpassword} = req.body;
    const { userId } =req.params;

    const user = await User.findById({userId }).select("+password");
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

    const user = await User.findById({ userId}).select("-password");
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
