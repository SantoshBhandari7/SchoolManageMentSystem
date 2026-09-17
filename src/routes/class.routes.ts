import express from "express";
import {
  createClass,
  deleteClass,
  getAllClass,
  getClassById,
  updateClass,
} from "../controllers/class.controller";
import { validate } from "../Middlewares/validator.middleware";
import {
  classSchema,
  createClassSchema,
  deleteClassSchema,
  getByIdClassSchema,
  updateClassSchema,
} from "../validators/class.validatore";
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

router.get(
  "/",
  authenticate([Role.ADMIN, Role.STUDENT, Role.STUDENT]),
  validate(classSchema),
  getAllClass,
);

router.get(
  "/:id",
  authenticate([Role.ADMIN, Role.STUDENT, Role.TEACHER]),
  validate(getByIdClassSchema),
  getClassById,
);

router.post(
  "/",
  authenticate([Role.ADMIN]),
  validate(createClassSchema),
  createClass,
);

router.put(
  "/:id",
  authenticate([Role.ADMIN]),
  validate(updateClassSchema),
  updateClass,
);

router.delete(
  "/:id",
  authenticate([Role.ADMIN]),
  validate(deleteClassSchema),
  deleteClass,
);

export default router;
