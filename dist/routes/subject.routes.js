"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_controller_1 = require("../controllers/subject.controller");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const subject_validator_1 = require("../validators/subject.validator");
const router = express_1.default.Router();
router.get("/", (0, validator_middleware_1.validate)(subject_validator_1.subjectSchema), subject_controller_1.getAllSubject);
router.get("/:id", (0, validator_middleware_1.validate)(subject_validator_1.getSubjectByIdSchema), subject_controller_1.getSubjectById);
router.post("/", (0, validator_middleware_1.validate)(subject_validator_1.createSubjectSchema), subject_controller_1.createSubject);
router.put("/:id", (0, validator_middleware_1.validate)(subject_validator_1.updateSubjectSchema), subject_controller_1.updateSubjectRecord);
router.delete("/:id", (0, validator_middleware_1.validate)(subject_validator_1.deleteSubjectSchema), subject_controller_1.deleteSubject);
exports.default = router;
