import mongoose from "mongoose";
import { Role } from "../@types/enum.types";

const userSchema = new mongoose.Schema({
        name:{
                type:String,
                required:[true, "name is required"],
                trim:true
        },
        email:{
                type:String,
                required:[true,"Email is required"],
                unique:[true, "duplicate email"],
                trim:true
        },
        password:{
                type:String,
                required:[true,"password is required"]
        },
        role:{
                type:String,
                enum:Role,
                required:true
        }

},{timestamps:true});

const User = mongoose.model("user",userSchema);
export default User;