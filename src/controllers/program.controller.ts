import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Program from "../models/program.model";
import { sendResponse } from "../utils/sendResponse.utils";
import { ApiError } from "../utils/ApiError.utils";

export const getProgram = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const programs = await Program.find();
    sendResponse(res, {
      message: "Programs are fetched success",
      data: programs,
      statusCode: 200,
    });
  },
);

export const getProgramById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const program = await Program.findById(id);
    if (!program) {
      throw new ApiError("Program  not found", 404);
    }
    sendResponse(res, {
      message: "program fetch",
      data: program,
      statusCode: 200,
    });
  },
);

export const createProgram = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, duration, eligibility } = req.body;

    const program = await Program.findById(id);
    if (program) {
      throw new ApiError("Program already exist", 404);
    }

    const newProgram = new Program({
      name,
      description,
      duration,
      eligibility,
    });

    await newProgram.save();

    sendResponse(res, {
      message: "Program created successfully",
      data: newProgram,
      statusCode: 201,
    });
  },
);

export const updateProgram = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, duration, eligibility } = req.body;

    const program = await Program.findById(id);
    if (!program) {
      throw new ApiError("Program not found", 404);
    }
    if (name) program.name = name;
    if (description) program.description = description;
    if (duration) program.duration = duration;
    if (eligibility) program.eligibility = eligibility;

    await program.save();

    sendResponse(res, {
      message: "Program Updated successfully",
      data: program,
      statusCode: 201,
    });
  },
);

export const deleteProgram = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);
    if (!program) {
      throw new ApiError("Program not found", 404);
    }

    sendResponse(res, {
      message: "program deleted successfully",
      data: null,
      statusCode: 200,
    });
  },
);
