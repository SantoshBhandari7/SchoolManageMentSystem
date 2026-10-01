import express from "express";
import {
  createProgram,
  deleteProgram,
  getProgram,
  getProgramById,
  updateProgram,
} from "../controllers/program.controller";
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";
import { validate } from "../Middlewares/validator.middleware";
import {
  createProgramSchema,
  deleteProgramSchema,
  getProgramByIdSchema,
  getProgramsSchema,
  updateProgramSchema,
} from "../validators/program.validate";
const router = express.Router();

router.get("/", validate(getProgramsSchema), getProgram);
router.get("/:id", validate(getProgramByIdSchema), getProgramById);
router.post(
  "/",
  //   authenticate([Role.ADMIN]),
  validate(createProgramSchema),
  createProgram,
);
router.put(
  "/:id",
  authenticate([Role.ADMIN]),
  validate(updateProgramSchema),
  updateProgram,
);
router.delete(
  "/:id",
  authenticate([Role.ADMIN]),
  validate(deleteProgramSchema),
  deleteProgram,
);

export default router;
