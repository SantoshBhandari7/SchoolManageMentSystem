"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherSchema = exports.getByIdTeacherSchema = exports.deleteTeacherSchema = exports.updateTeacherSchema = exports.createTeacherSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const enum_types_1 = require("../@types/enum.types");
exports.createTeacherSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? "fullname is required"
                : "fullname must be string",
        })
            .min(3, "full_name must be 3 character long")
            .max(100, "full_name must not exceed that 100 character"),
        password: zod_1.default.string({
            error: (issue) => issue.input === undefined
                ? "password is required"
                : "password must be string",
        }),
        email: zod_1.default.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "Invalid email format",
        }),
        gender: zod_1.default.enum(enum_types_1.Gender, { error: "gender must be valid" }).optional(),
        address: zod_1.default
            .string({
            error: "address must be string",
        })
            .optional(),
        subject: zod_1.default.string({
            error: (issue) => issue.input === undefined
                ? "Subject is required"
                : "Subject must be string",
        }),
        salary: zod_1.default.coerce
            .number({
            error: "salary must be in number",
        })
            .positive("salary must be positive"),
        experience: zod_1.default.coerce.number({
            error: (issue) => issue.input === undefined
                ? "experience is required"
                : "Experience must be number",
        }),
        phone: zod_1.default
            .string({
            error: "parent name must be string",
        })
            .regex(/^\d{10}$/, "phone number should be exact 10")
            .optional(),
    }),
});
exports.updateTeacherSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({
            error: (issue) => issue.input === null
                ? "email must be string"
                : "invalid email format",
        })
            .optional(),
        password: zod_1.default
            .string({
            error: "password must be string",
        })
            .optional(),
        address: zod_1.default
            .string({
            error: "address must be string",
        })
            .trim()
            .optional(),
        salary: zod_1.default.coerce
            .number({
            error: "salary must be number",
        })
            .positive("salary must be positive")
            .optional(),
        phone: zod_1.default
            .string({
            error: "parentPhone must be string",
        })
            .regex(/^9\d{9}$/, "parentPhone must contain exactly 10 digits")
            .optional(),
    }),
    experience: zod_1.default.coerce
        .number({
        error: "experience should be number",
    })
        .positive("experience must be positive")
        .optional(),
    params: zod_1.default.object({
        userId: zod_1.default
            .string({
            error: "userId must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid user id"),
    }),
});
exports.deleteTeacherSchema = zod_1.default.object({
    params: zod_1.default.object({
        userId: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getByIdTeacherSchema = zod_1.default.object({
    params: zod_1.default.object({
        userId: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.teacherSchema = zod_1.default.object({
    query: zod_1.default.object({
        query: zod_1.default.string().optional(),
        order: zod_1.default.enum(["DESC", "ASC"]).default("DESC"),
        sortBy: zod_1.default.string().default("createdAt"),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(10),
        page: zod_1.default.coerce.number().int().min(1).default(1),
    }),
});
