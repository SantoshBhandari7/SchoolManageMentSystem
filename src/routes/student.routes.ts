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

const router = express.Router();

router.get("/", validate(studentSchema), getStudent);

router.get("/:userId", validate(getByIdStudentSchema), getStudnetById);

router.post("/", validate(createStudentSchema), createStudent);

router.put("/:userId", validate(updateStudentSchema), updateStudent);

router.delete("/:userId", validate(deleteStudentSchema), deleteStudnet);

router.get("/:userId", getProfile);

export default router;
