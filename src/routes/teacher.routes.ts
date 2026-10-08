import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
  getMyTeacherProfile,
  getTeacherById,
  updateTeacher,
} from "../controllers/teacher.controller";
import { validate } from "../Middlewares/validator.middleware";
import {
  createTeacherSchema,
  deleteTeacherSchema,
  getByIdTeacherSchema,
  teacherSchema,
  updateTeacherSchema,
} from "../validators/teacher.validator";
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";
import { uploader } from "../Middlewares/multer.middleware";
import { getProfile } from "../controllers/auth.controller";

const upload = uploader();
const router = express.Router();

router.get(
  "/",
  // authenticate([Role.ADMIN]),
  validate(teacherSchema),
  getAllTeacher,
);

router.get(
  "/me",
  // authenticate(),
  getMyTeacherProfile,
);

router.get(
  "/:userId",
  // authenticate([Role.ADMIN]),
  validate(getByIdTeacherSchema),
  getTeacherById,
);

router.post(
  "/",
  // authenticate([Role.ADMIN]),
  upload.single("profile_image"),
  validate(createTeacherSchema),
  createTeacher,
);

router.put(
  "/:userId",
  authenticate([Role.ADMIN]),
  validate(updateTeacherSchema),
  updateTeacher,
);

router.delete(
  "/:userId",
  authenticate([Role.ADMIN]),
  validate(deleteTeacherSchema),
  deleteTeacher,
);

export default router;
