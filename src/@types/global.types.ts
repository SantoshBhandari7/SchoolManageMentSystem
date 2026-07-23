import mongoose from "mongoose";
import { Role } from "./enum.types";

export interface IImage {
        path:string;
        public_id:string;
}

export interface Ipayload {
        full_name:string;
        email:string;
        _id:mongoose.Types.ObjectId;
        role:Role
}

export interface IJwtDecodedData extends Ipayload{
        iat:number;
        exp:number;
}