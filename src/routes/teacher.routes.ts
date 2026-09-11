import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
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

const router = express.Router();

router.get("/", validate(teacherSchema), getAllTeacher);

router.get("/:userId", validate(getByIdTeacherSchema), getTeacherById);

router.post("/", validate(createTeacherSchema), createTeacher);

router.put("/:userId", validate(updateTeacherSchema), updateTeacher);

router.delete("/:userId", validate(deleteTeacherSchema), deleteTeacher);

export default router;
