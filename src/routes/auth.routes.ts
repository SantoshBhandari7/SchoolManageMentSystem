import express from "express";
import multer from "multer";
import { login, registerAdmin } from "../controllers/auth.controller";
import { uploader } from "../Middlewares/multer.middleware";

const router = express.Router();

const upload = uploader();
router.post("/register", upload.single("profile_image"), registerAdmin);

router.post("/Login", login);

export default router;
