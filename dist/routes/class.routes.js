"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const class_controller_1 = require("../controllers/class.controller");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const class_validatore_1 = require("../validators/class.validatore");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const router = express_1.default.Router();
router.get("/", 
// authenticate([Role.ADMIN, Role.STUDENT, Role.STUDENT]),
(0, validator_middleware_1.validate)(class_validatore_1.classSchema), class_controller_1.getAllClass);
router.get("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.STUDENT, enum_types_1.Role.TEACHER]), (0, validator_middleware_1.validate)(class_validatore_1.getByIdClassSchema), class_controller_1.getClassById);
router.post("/", 
// authenticate([Role.ADMIN]),
(0, validator_middleware_1.validate)(class_validatore_1.createClassSchema), class_controller_1.createClass);
router.put("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(class_validatore_1.updateClassSchema), class_controller_1.updateClass);
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(class_validatore_1.deleteClassSchema), class_controller_1.deleteClass);
exports.default = router;
