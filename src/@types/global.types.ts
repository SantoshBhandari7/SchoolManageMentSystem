import mongoose from "mongoose";
import { Role } from "./enum.types";

export interface IImage {
  path: string;
  public_id: string;
}

export interface IPayload {
  name: string;
  email: string;
  _id: mongoose.Types.ObjectId;
  role: Role;
}

export interface IJwtDecodedData extends IPayload {
  iat: number;
  exp: number;
}
