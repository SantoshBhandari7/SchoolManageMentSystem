import mongoose from "mongoose";
import { Gender, Role } from "../@types/enum.types";

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },  
    phone: {
      type: String,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    experiance: {
      type: Number,
      required: true,
    },

    subject: {
      type: String,
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
