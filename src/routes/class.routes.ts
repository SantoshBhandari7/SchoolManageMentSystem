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

const router = express.Router();

router.get("/", validate(classSchema), getAllClass);

router.get("/:id", validate(getByIdClassSchema), getClassById);

router.post("/", validate(createClassSchema), createClass);

router.put("/:id", validate(updateClassSchema), updateClass);

router.delete("/:id", validate(deleteClassSchema), deleteClass);

export default router;
