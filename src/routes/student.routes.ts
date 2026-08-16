import express from "express";
import {
  createStudent,
  deleteStudnet,
  getProfile,
  getStudent,
  getStudnetById,
  updateStudent,
} from "../controllers/student.controller";

const router = express.Router();

router.get("/", getStudent);

router.get("/:userId", getStudnetById);

router.post("/", createStudent);

router.put("/:userId", updateStudent);

router.delete("/:userId", deleteStudnet);

router.get("/:userId", getProfile);

export default router;
