import express from "express";
import { createTeacher, deleteTeacher, getAllTeacher, getTeacherById, updateTeacher } from "../controllers/teacher.controller";


const router = express.Router();


router.get("/", getAllTeacher);

router.get("/:userId", getTeacherById);

router.post("/", createTeacher);

router.put("/:userId", updateTeacher);

router.delete("/:userId", deleteTeacher);

export default router;