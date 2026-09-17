import mongoose from "mongoose";
import { Role } from "../@types/enum.types";
import jwt from "jsonwebtoken";
import Env_Config from "../config/ENV_CONFIG";
import { IJwtDecodedData } from "../@types/global.types";
interface IPayload {
  name: string;
  email: string;
  _id: mongoose.Types.ObjectId;
  role: Role;
}

export const generateJwtToken = (payload: IPayload) => {
  try {
    return jwt.sign(payload, Env_Config.jwt_secrete, {
      expiresIn: Env_Config.jwt_expiresin as any,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, Env_Config.jwt_secrete) as IJwtDecodedData;
};
