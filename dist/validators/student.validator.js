"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = exports.getByIdStudentSchema = exports.deleteStudentSchema = exports.updateStudentSchema = exports.createStudentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const enum_types_1 = require("../@types/enum.types");
exports.createStudentSchema = zod_1.default.object({
    body: zod_1.default.object({
        // user:z
        //   .string({
        //     error: (issue) =>
        //       issue.input === null ? "user is required" : "user must be string",
        //   })
        //   .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid user id"),
        name: zod_1.default
            .string({
            error: (issue) => issue.input === null
                ? "fullname is required"
                : "fullname must be string",
        })
            .min(3, "full_name must be 3 character long")
            .max(100, "full_name must not exceed that 100 character"),
        password: zod_1.default.string({
            error: (issue) => issue.input === null
                ? "password is required"
                : "password must be string",
        }),
        email: zod_1.default.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "Invalid email format",
        }),
        gender: zod_1.default.enum(enum_types_1.Gender, {
            error: (issue) => {
                return issue.input === undefined
                    ? "Gender is required"
                    : "Gender must be valid";
            },
        }),
        address: zod_1.default.string({
            error: (issue) => issue.input === null ? "address is required" : "address must be string",
        }),
        roll_no: zod_1.default.coerce
            .number({
            error: (issue) => issue.input === null
                ? "roll_no is required"
                : "roll_no must be number",
        })
            .int("roll_no should be integer")
            .positive("roll_n0 should be positive"),
        classId: zod_1.default
            .string({
            error: (issue) => issue.input === null ? "class is required" : "class must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid class id"),
        parentName: zod_1.default
            .string({
            error: (issue) => issue.input === null
                ? "parentName is required"
                : "parentName must be string",
        })
            .min(3, "parent name at least 3 character")
            .max(10, "parent name should not exceeds than 100 characters"),
        parentPhone: zod_1.default
            .string({
            error: "parent name must be string",
        })
            .regex(/^\d{10}$/, "phone number should be exact 10")
            .optional(),
        file: zod_1.default
            .object({
            fieldname: zod_1.default.string(),
            originalname: zod_1.default.string(),
            encoding: zod_1.default.string(),
            mimetype: zod_1.default.string(),
            size: zod_1.default.number(),
        })
            .refine((file) => file.fieldname === "profile_image", "Profile image is required"),
    }),
});
exports.updateStudentSchema = zod_1.default.object({
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
        roll_no: zod_1.default.coerce
            .number({
            error: "rollno must be number",
        })
            .int("roll_no must be an integer")
            .positive("roll_no must be greater than 0")
            .optional(),
        parentPhone: zod_1.default
            .string({
            error: "parentPhone must be string",
        })
            .regex(/^9\d{9}$/, "parentPhone must contain exactly 10 digits")
            .optional(),
    }),
    params: zod_1.default.object({
        userId: zod_1.default
            .string({
            error: "userId must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid user id"),
    }),
});
exports.deleteStudentSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getByIdStudentSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.studentSchema = zod_1.default.object({
    query: zod_1.default.object({
        query: zod_1.default.string().optional(),
        order: zod_1.default.enum(["DESC", "ASC"]).default("DESC"),
        sortBy: zod_1.default.string().default("createdAt"),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(10),
        page: zod_1.default.coerce.number().int().min(1).default(1),
    }),
});
