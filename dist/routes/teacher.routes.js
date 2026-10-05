"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controllers/teacher.controller");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const teacher_validator_1 = require("../validators/teacher.validator");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const router = express_1.default.Router();
router.get("/", 
// authenticate([Role.ADMIN]),
(0, validator_middleware_1.validate)(teacher_validator_1.teacherSchema), teacher_controller_1.getAllTeacher);
router.get("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(teacher_validator_1.getByIdTeacherSchema), teacher_controller_1.getTeacherById);
router.post("/", 
// authenticate([Role.ADMIN]),
(0, validator_middleware_1.validate)(teacher_validator_1.createTeacherSchema), teacher_controller_1.createTeacher);
router.put("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(teacher_validator_1.updateTeacherSchema), teacher_controller_1.updateTeacher);
router.delete("/:userId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(teacher_validator_1.deleteTeacherSchema), teacher_controller_1.deleteTeacher);
exports.default = router;
