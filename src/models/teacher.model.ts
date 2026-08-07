import mongoose from "mongoose";
import { Role } from "../@types/enum.types";

const teacherSchema = new mongoose.Schema(
  {
   user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
   },
   phone:{
        type:String
   },
   subject:{
        type:String
   },
   salary:{
        type:Number,
   },
   address:{
        type:String
   }
  },
  { timestamps: true },
);
const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;