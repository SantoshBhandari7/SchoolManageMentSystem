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
import { authenticate } from "../Middlewares/auth.middleware";
import { Role } from "../@types/enum.types";

const router = express.Router();

const upload = uploader();
router.post(
  "/register",
  authenticate([Role.ADMIN]),
  upload.single("profile_image"),

  validate(registerUserSchema),
  registerAdmin,
);

router.post("/Login", validate(loginSchema), login);

router.get("/getprofile", authenticate(), getProfile);

router.post("/logout", authenticate(), logout);

export default router;
