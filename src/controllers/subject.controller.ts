import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Subject from "../models/subject.models";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";
import Teacher from "../models/teacher.model";
import Class from "../models/class.models";

export const getAllSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const subject = await Subject.find();
    sendResponse(res, {
      message: "All Subject fetche",
      data: subject,
      statusCode: 200,
    });
  },
);

export const getSubjectById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subject = await Subject.findById(id);

    if (!subject) {
      throw new ApiError("Subject not found", 404);
    }

    sendResponse(res, {
      message: "Subject record fetch",
      data: subject,
      statusCode: 200,
    });
  },
);

export const createSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { subjectname, credithour,teacherId, classId } = req.body;


    const existSubject = await Subject.findOne({subjectname});
    const existTeacher = await Teacher.findById(teacherId);
    const existClass = await Class.findById(classId);

    if (existSubject) {
      throw new ApiError("Subject already exist", 404);
    }

    if (!existTeacher) {
      throw new ApiError("Teacher is not assign", 404);
    }
    if (!existClass) {
      throw new ApiError("Class is not assign", 404);
    }

    const subject = new Subject({
      subjectname,
      credithour,
      teacher: existTeacher._id,
      class: existClass._id,
    });

    await subject.save();

    sendResponse(res, {
      message: "Subject created successfully",
      data: subject,
      statusCode: 201,
    });
  },
);

export const updateSubjectRecord = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { subjectname, credithour, teacherId, classId } = req.body;

    const subject = await Subject.findById(id);
    const teacherrecord = await Teacher.findById(teacherId);
    const classrecord = await Class.findById(classId);

    if (!subject ) {
      throw new ApiError("Subject not found", 404);
    }
    if(!teacherrecord){
        throw new ApiError("teacher not found",404);
    }
    if(!classrecord){
        throw new ApiError("class not found",404);
    }

    if (subjectname) subject.subjectname = subjectname;
    if (classId) subject.class = classrecord._id;
    if (teacherId) subject.teacher = teacherrecord._id;
    if (credithour) subject.credithour = credithour;

    await subject.save();

    sendResponse(res, {
      message: "Subject Updated",
      data: subject,
      statusCode: 201,
    });
  },
);

export const deleteSubject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      throw new ApiError("Student not found", 404);
    }

    sendResponse(res, {
      message: "Subject record deleted",
      data: null,
      statusCode: 200,
    });
  },
);
