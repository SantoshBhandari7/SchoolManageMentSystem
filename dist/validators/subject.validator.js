"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectSchema = exports.getSubjectByIdSchema = exports.deleteSubjectSchema = exports.updateSubjectSchema = exports.createSubjectSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.createSubjectSchema = zod_1.default.object({
    body: zod_1.default.object({
        subjectname: zod_1.default
            .string({
            error: (issue) => issue.input === null
                ? "subjectname is required "
                : "subjectname must be string",
        })
            .min(4, "subjectname atleast 4 character long")
            .max(100, "subjectname should not be exceed than 100 character long"),
        credithour: zod_1.default.coerce
            .number({
            error: (issue) => issue.input === null
                ? "credit our is required"
                : "credit hour must be number",
        })
            .int("number should be in interger")
            .positive("credit our must be greater than 0"),
        teacherId: zod_1.default
            .string({
            error: (issue) => issue.input === null
                ? "teacher is required"
                : "teacher id must be in string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "teacher id is invalid"),
        classId: zod_1.default
            .string({
            error: "classId must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "class id is invalid")
            .optional(),
    }),
});
exports.updateSubjectSchema = zod_1.default.object({
    body: zod_1.default.object({
        subjectname: zod_1.default
            .string({
            error: "subject name must be string",
        })
            .min(4, "subject name should be atleast 4 character long")
            .max(100, "subjectname should not be exceed than 100 character long")
            .optional(),
        classId: zod_1.default
            .string({
            error: "classid must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid class id")
            .optional(),
        teacherId: zod_1.default
            .string({
            error: "teacherid must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid classid")
            .optional(),
        crefithour: zod_1.default.coerce
            .number({
            error: "credit must be number",
        })
            .positive("credit must be greater than 0")
            .int()
            .optional(),
    }),
});
exports.deleteSubjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string({
            error: "id should be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getSubjectByIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string({
            error: "id must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.subjectSchema = zod_1.default.object({
    query: zod_1.default.object({
        query: zod_1.default.string().optional(),
        order: zod_1.default.enum(["DESC", "ASC"]).default("DESC"),
        sortBy: zod_1.default.string().default("createdAt"),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(10),
        page: zod_1.default.coerce.number().int().min(1).default(1),
    }),
});
