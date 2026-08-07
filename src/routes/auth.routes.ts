
import express from "express";
import { login, registerAdmin } from "../controllers/auth.controller";

const router =express.Router();

router.post("/register",registerAdmin);

router.post("/Login", login);

export default router