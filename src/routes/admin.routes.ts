import express from "express";
import {
  createStudent,
  createTeacher,
  deleteStudnet,
  deleteTeacher,
  getAllTeacher,
  getStudent,
  getStudnetById,
  getTeacherById,
  updateStudent,
  updateTeacher,
} from "../controllers/admin.controller";

const router = express.Router();
router.get("/", getStudent);

router.get("/:userId", getStudnetById);
router.post("/", createStudent);
router.put("/:userId", updateStudent);
router.delete("/:userId", deleteStudnet);

router.get("/", getAllTeacher);
router.get("/:userId", getTeacherById);
router.post("/", createTeacher);
router.put("/:userId", updateTeacher);
router.delete("/:userId", deleteTeacher);

export default router;
