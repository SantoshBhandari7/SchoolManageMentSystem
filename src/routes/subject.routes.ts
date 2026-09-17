import express from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubjectById,
  updateSubjectRecord,
} from "../controllers/subject.controller";
import { validate } from "../Middlewares/validator.middleware";
import {
  createSubjectSchema,
  deleteSubjectSchema,
  getSubjectByIdSchema,
  subjectSchema,
  updateSubjectSchema,
} from "../validators/subject.validator";
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get("/", validate(subjectSchema), getAllSubject);

router.get("/:id", validate(getSubjectByIdSchema), getSubjectById);

router.post("/", validate(createSubjectSchema), createSubject);

router.put("/:id", validate(updateSubjectSchema), updateSubjectRecord);

router.delete("/:id", validate(deleteSubjectSchema), deleteSubject);

export default router;
