import mongoose, { mongo } from "mongoose";
import { Gender } from "../@types/enum.types";

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      requires: true,
    },
    gender: {
      type: String,
      enum:Gender,
    },
    address: {
      type: String,
    },
    rollno: {
      type: Number,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
    parentName: {
      type: String,
    },
    parentPhone: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Student = mongoose.model("student", studentSchema);
export default Student;
