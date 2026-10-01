"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgramSchema = exports.updateProgramSchema = exports.getProgramByIdSchema = exports.getProgramsSchema = exports.createProgramSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const objectIdSchema = zod_1.z
    .string()
    .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: "Invalid Program ID",
});
exports.createProgramSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, "Program name must be at least 2 characters")
            .max(100, "Program name must not exceed 100 characters"),
        description: zod_1.z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description must not exceed 500 characters")
            .optional(),
        duration: zod_1.z
            .string()
            .min(1, "Duration must be at least 1 year")
            .max(10, "Duration cannot exceed 10 years"),
        eligibility: zod_1.z
            .string()
            .min(2, "Eligibility must be at least 2 characters")
            .max(300, "Eligibility must not exceed 300 characters")
            .optional(),
    }),
});
exports.getProgramsSchema = zod_1.z.object({
    query: zod_1.z.object({}).optional(),
});
exports.getProgramByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: objectIdSchema,
    }),
});
exports.updateProgramSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: objectIdSchema,
    }),
    body: zod_1.z
        .object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Program name must be at least 2 characters")
            .max(100, "Program name must not exceed 100 characters")
            .optional(),
        description: zod_1.z
            .string()
            .trim()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description must not exceed 500 characters")
            .optional(),
        duration: zod_1.z
            .string()
            .min(1, "Duration must be at least 1 year")
            .max(10, "Duration cannot exceed 10 years")
            .optional(),
        eligibility: zod_1.z
            .string()
            .trim()
            .min(2, "Eligibility must be at least 2 characters")
            .max(300, "Eligibility must not exceed 300 characters")
            .optional(),
    })
        .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required for update",
    }),
});
exports.deleteProgramSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: objectIdSchema,
    }),
});
