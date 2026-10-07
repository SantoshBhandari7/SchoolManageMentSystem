import mongoose, { mongo } from "mongoose";
import { Gender } from "../@types/enum.types";
import { required } from "zod/mini";
import { imageSchema } from "./image.model";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    profile_image: {
      type: imageSchema,
      required: [true, "profile_image is required"],
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    roll_no: {
      type: Number,
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    parentPhone: {
      type: String,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("student", studentSchema);
export default Student;
