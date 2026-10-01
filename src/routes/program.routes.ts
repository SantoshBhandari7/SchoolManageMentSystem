import express from "express";
import {
  createProgram,
  deleteProgram,
  getProgram,
  getProgramById,
  updateProgram,
} from "../controllers/program.controller";
const router = express.Router();

router.get("/", getProgram);
router.get("/:id", getProgramById);
router.post("/", createProgram);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);

export default router;
