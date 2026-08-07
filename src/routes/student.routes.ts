import express from "express";
import { getProfile, updateStudent } from "../controllers/student.controller";

const router = express.Router();

// router.get("/:userId",getStudent);
router.put("/:userId", updateStudent);
router.get("/:userId", getProfile);
export default router;