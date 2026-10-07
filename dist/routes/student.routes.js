"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const student_validator_1 = require("../validators/student.validator");
const multer_middleware_1 = require("../Middlewares/multer.middleware");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const upload = (0, multer_middleware_1.uploader)();
const router = express_1.default.Router();
router.get("/", 
// authenticate([Role.ADMIN, Role.TEACHER]),
(0, validator_middleware_1.validate)(student_validator_1.studentSchema), student_controller_1.getStudent);
router.get("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.TEACHER]), (0, validator_middleware_1.validate)(student_validator_1.getByIdStudentSchema), student_controller_1.getStudentById);
router.post("/", 
// authenticate([Role.ADMIN]),
upload.single("profile_image"), (0, validator_middleware_1.validate)(student_validator_1.createStudentSchema), student_controller_1.createStudent);
router.put("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.STUDENT]), (0, validator_middleware_1.validate)(student_validator_1.updateStudentSchema), student_controller_1.updateStudent);
router.delete("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(student_validator_1.deleteStudentSchema), student_controller_1.deleteStudent);
exports.default = router;
