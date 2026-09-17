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
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";
// import { upload } from "../utils/cloudinary.utils";

const upload = uploader();

const router = express.Router();

router.get(
  "/",
  authenticate([Role.ADMIN, Role.TEACHER]),
  validate(studentSchema),
  getStudent,
);

router.get(
  "/:userId",
  authenticate([Role.ADMIN, Role.TEACHER]),
  validate(getByIdStudentSchema),
  getStudnetById,
);

router.post(
  "/",
  authenticate([Role.ADMIN]),
  upload.single("profile_images"),
  validate(createStudentSchema),
  createStudent,
);

router.put(
  "/:userId",
  authenticate([Role.ADMIN, Role.STUDENT]),
  validate(updateStudentSchema),
  updateStudent,
);

router.delete(
  "/:userId",
  authenticate([Role.ADMIN]),
  validate(deleteStudentSchema),
  deleteStudnet,
);

router.get("/:profile", authenticate(), getProfile);

export default router;
