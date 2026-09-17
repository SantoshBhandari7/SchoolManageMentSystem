import express from "express";
import multer from "multer";
import {
  getProfile,
  login,
  logout,
  registerAdmin,
} from "../controllers/auth.controller";
import { uploader } from "../Middlewares/multer.middleware";
import { validate } from "../Middlewares/validator.middleware";
import { loginSchema, registerUserSchema } from "../validators/auth.validator";

const router = express.Router();

const upload = uploader();
router.post(
  "/register",
  upload.single("profile_image"),
  validate(registerUserSchema),
  registerAdmin,
);

router.post("/Login", validate(loginSchema), login);

router.get("/getprofile", getProfile);

router.post("/logout", logout);

export default router;
