import express from "express";
import {
  createClass,
  deleteClass,
  getAllClass,
  getClassById,
  updateClass,
} from "../controllers/class.controller";

const router = express.Router();

router.get("/", getAllClass);

router.get("/:id", getClassById);

router.post("/", createClass);

router.put("/:id", updateClass);

router.delete("/:id", deleteClass);

export default router;
