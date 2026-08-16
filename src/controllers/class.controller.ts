import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Class from "../models/class.models";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import Teacher from "../models/teacher.model";

export const getAllClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const classrecord = await Class.find();

    sendResponse(res, {
      message: "All Class Record Fetch",
      data: classrecord,
      statusCode: 200,
    });
  },
);

export const getClassById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const classbyId = await Class.findById(id);
    if (!classbyId) {
      throw new ApiError("Class not found", 404);
    }

    sendResponse(res, {
      message: "class record fetch",
      data: classbyId,
      statusCode: 200,
    });
  },
);

export const createClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { classname, section, room_no, teacherId } = req.body;

    const existClass = await Class.findOne({ classname });
    const existTeacher = await Teacher.findById(teacherId);

    if (existClass) {
      throw new ApiError("class already exist", 404);
    }
    if (!existTeacher) {
      throw new ApiError("teacher is not assign", 404);
    }

    const newClass = new Class({
      classname,
      section,
      room_no,
      teacher: existTeacher._id,
    });
    await newClass.save();

    sendResponse(res, {
      message: "Class record created",
      data: newClass,
      statusCode: 201,
    });
  },
);

export const updateClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { classname, room_no, teacherId, section } = req.body;

    const classrecord = await Class.findById(id);
    const teacher = await Teacher.findById(teacherId);

    if (!classrecord) {
      throw new ApiError("class is not found", 404);
    }
    if (!teacher) {
      throw new ApiError("teacher not found", 404);
    }

    if (classname) classrecord.classname = classname;
    if (room_no) classrecord.room_no = room_no;
    if (section) classrecord.section = section;
    if (teacherId) classrecord.teacher = teacher._id;

    await classrecord.save();

    sendResponse(res, {
      message: "Class record updated",
      data: classrecord,
      statusCode: 201,
    });
  },
);

export const deleteClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const classrecord = await Class.findByIdAndDelete(id);

    if (!classrecord) {
      throw new ApiError("Class not found", 404);
    }

    sendResponse(res, {
      message: "class record deleted",
      data: null,
      statusCode: 200,
    });
  },
);
