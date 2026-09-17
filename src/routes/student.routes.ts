import express from "express";
import {
  createStudent,
  deleteStudnet,
  getProfile,
  getStudent,
  getStudnetById,
  updateStudent,
} from "../controllers/student.controller";
import { validate } from "../Middlewares/validator.middleware";
import {
  createStudentSchema,
  deleteStudentSchema,
  getByIdStudentSchema,
  studentSchema,
  updateStudentSchema,
} from "../validators/student.validator";
import { uploader } from "../Middlewares/multer.middleware";
import { profile } from "node:console";
// import { upload } from "../utils/cloudinary.utils";

const upload = uploader();

const router = express.Router();

router.get("/", validate(studentSchema), getStudent);

router.get("/:userId", validate(getByIdStudentSchema), getStudnetById);

router.post(
  "/",
  validate(createStudentSchema),
  upload.single("profile_images"),
  createStudent,
);

router.put("/:userId", validate(updateStudentSchema), updateStudent);

router.delete("/:userId", validate(deleteStudentSchema), deleteStudnet);

router.get("/:userId", getProfile);

export default router;
