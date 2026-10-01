"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const program_controller_1 = require("../controllers/program.controller");
const auth_middleware_1 = require("../Middlewares/auth.middleware");
const enum_types_1 = require("../@types/enum.types");
const validator_middleware_1 = require("../Middlewares/validator.middleware");
const program_validate_1 = require("../validators/program.validate");
const router = express_1.default.Router();
router.get("/", (0, validator_middleware_1.validate)(program_validate_1.getProgramsSchema), program_controller_1.getProgram);
router.get("/:id", (0, validator_middleware_1.validate)(program_validate_1.getProgramByIdSchema), program_controller_1.getProgramById);
router.post("/", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(program_validate_1.createProgramSchema), program_controller_1.createProgram);
router.put("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(program_validate_1.updateProgramSchema), program_controller_1.updateProgram);
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN]), (0, validator_middleware_1.validate)(program_validate_1.deleteProgramSchema), program_controller_1.deleteProgram);
exports.default = router;
