import mongoose from "mongoose";
import { Gender, Role } from "../@types/enum.types";
import { imageSchema } from "./image.model";

const teacherSchema = new mongoose.Schema(
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
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    experience: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);
const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;
