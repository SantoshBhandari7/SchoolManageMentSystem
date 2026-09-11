import express from "express";
import multer from "multer";
import { login, registerAdmin } from "../controllers/auth.controller";
import { uploader } from "../Middlewares/multer.middleware";
import { validate } from "../Middlewares/validator.middleware";
import { loginSchema, registerUserSchema } from "../validators/auth.validator";

const router = express.Router();

const upload = uploader();
router.post("/register", upload.single("profile_image"), validate(registerUserSchema), registerAdmin);

router.post("/Login", validate(loginSchema), login);

export default router;
