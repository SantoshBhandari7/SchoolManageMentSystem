import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Class from "../models/class.models";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import Teacher from "../models/teacher.model";
import { getPagination } from "../utils/withPagination.utils";

export const getAllClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query,
      limit = 10,
      order = "DESC",
      sortBy = "createdAt",
      page = 1,
    } = req.query;

    const perPage = Number(limit);
    const currentPage = Number(page);
    const skip = perPage * (currentPage - 1);

    const filter: any = {};

    if (query) {
      filter.$or = [
        {
          className: {
            $regex: query,
            $options: "i",
          },
        },
        {
          section: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    const classRecord = await Class.find(filter)
      .populate({
        path: "teacher",
        populate: {
          path: "subject",
          select: "subjectname",
        },
      })
      .limit(perPage)
      .skip(skip)
      .sort({ [sortBy as string]: order === "DESC" ? -1 : 1 });

    const total_count = await Class.countDocuments(filter);

    sendResponse(res, {
      message: "All Class Record Fetch",
      data: {
        classRecord,
        pagination: getPagination(total_count, perPage, currentPage),
      },
      statusCode: 200,
    });
  },
);

export const getClassById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const classById = await Class.findById(id);
    if (!classById) {
      throw new ApiError("Class not found", 404);
    }

    sendResponse(res, {
      message: "class record fetch",
      data: classById,
      statusCode: 200,
    });
  },
);

export const createClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { classname, section, room_no, teacherId } = req.body;

    const existClass = await Class.findOne({ classname, section });
    // const existTeacher = await Teacher.findById(teacherId);

    if (existClass) {
      throw new ApiError("class already exist", 404);
    }

    const newClass = new Class({
      classname,
      section,
      room_no,
      teacher: teacherId,
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

    const classRecord = await Class.findById(id);
    const teacher = await Teacher.findById(teacherId);

    if (!classRecord) {
      throw new ApiError("class is not found", 404);
    }
    if (!teacher) {
      throw new ApiError("teacher not found", 404);
    }

    if (classname) classRecord.classname = classname;
    if (room_no) classRecord.room_no = room_no;
    if (section) classRecord.section = section;
    if (teacherId) classRecord.teacher = teacher._id;

    await classRecord.save();

    sendResponse(res, {
      message: "Class record updated",
      data: classRecord,
      statusCode: 201,
    });
  },
);

export const deleteClass = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const classRecord = await Class.findByIdAndDelete(id);

    if (!classRecord) {
      throw new ApiError("Class not found", 404);
    }

    sendResponse(res, {
      message: "class record deleted",
      data: null,
      statusCode: 200,
    });
  },
);
