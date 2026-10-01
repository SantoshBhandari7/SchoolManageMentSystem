import mongoose from "mongoose";
import { required } from "zod/mini";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
    },
  },
  { timestamps: true },
);

const Program = mongoose.model("program", programSchema);
export default Program;
