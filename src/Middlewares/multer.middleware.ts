import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError.utils";

export const uploader = () => {
  const folder = "uploads";
  const fileSize = 5 * 1024 * 1024;

  console.log(fs.existsSync(folder));
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName);
    },
  });

  const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowed_extention = [".png", ".jpeg", ".jpg", ".svg", ".webp"];
    const mime_types = ["image/jpg", "image/jpeg", "image/jpg", "image/svg", "image/webp"];

    const file_ext = path.extname(file.originalname);
    console.log(file);


    if (!allowed_extention.includes(file_ext) || !mime_types.includes(file.mimetype)) {
      console.log(file);
      cb(
        new ApiError(`Invalid file format. only ${allowed_extention.join(",").replaceAll(".", "")}file are expected`, 422)
      )
    } else {
      cb(null, true);
    }

  }
  const upload = multer({
    storage,
    limits: {
      fileSize: fileSize,
    },
  });
  return upload;
};
