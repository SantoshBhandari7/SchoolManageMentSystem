import express from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  getSubjectById,
  updateSubjectRecord,
} from "../controllers/subject.controller";

const router = express.Router();

router.get("/", getAllSubject);

router.get("/:id", getSubjectById);

router.post("/", createSubject);

router.put("/:id", updateSubjectRecord);

router.delete("/:id", deleteSubject);

export default router;
