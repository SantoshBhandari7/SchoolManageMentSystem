import mongoose, { mongo } from "mongoose";
import { Gender } from "../@types/enum.types";
import { required } from "zod/mini";
import { imageSchema } from "./image.model";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requires: true,
    },
    profile_image: {
      type: imageSchema,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    address: {
      type: String,
    },
    roll_no: {
      type: Number,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
    parentName: {
      type: String,
      required: true,
    },
    parentPhone: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("student", studentSchema);
export default Student;
