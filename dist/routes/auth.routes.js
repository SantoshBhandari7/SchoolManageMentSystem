"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const multer_middleware_1 = require("../Middlewares/multer.middleware");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.uploader)();
router.post("/register", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), upload.single("profile_image"), (0, validator_middleware_1.validate)(auth_validator_1.registerUserSchema), auth_controller_1.registerAdmin);
router.post("/Login", (0, validator_middleware_1.validate)(auth_validator_1.loginSchema), auth_controller_1.login);
// router.get("/getprofile", authenticate(), getProfile);
router.post("/logout", (0, auth_middleware_1.authenticate)(), auth_controller_1.logout);
exports.default = router;
