import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { ApiError } from "../utils/ApiError.utils";

export const upload = async (file: Express.Multer.File, dir = "/") => {
  try {
    const folder = "/schoolmanagement" + dir;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        unique_filename: true,
        folder: folder,
        transformation: {
          width: 800,
          height: 800,
          crop: "fill",
          fetch_format: "auto",
          format: "auto",
        },
      },
    );

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {
      path: secure_url,
      public_id,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError("Upload error", 500);
  }
};


export const removeFile= async(public_id:string)=>{
  try {
    await cloudinary.uploader.destroy(public_id);
    return true
  } catch (error) {
    console.log(error);
    throw new ApiError("Something went wrong", 500);
    
  }
}
