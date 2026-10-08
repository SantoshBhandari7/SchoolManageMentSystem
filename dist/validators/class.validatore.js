"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classSchema = exports.getByIdClassSchema = exports.deleteClassSchema = exports.updateClassSchema = exports.createClassSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.createClassSchema = zod_1.default.object({
    body: zod_1.default.object({
        classname: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? "full name is required"
                : "full name must be string",
        })
            .min(3, "name must be 3 character long")
            .max(100, "name should not exceeds 100 characters long"),
        section: zod_1.default.string({
            error: (issue) => issue.input === null ? "section is reauired" : "section must be string",
        }),
        room_no: zod_1.default.coerce
            .number({
            error: (issue) => issue.input === null
                ? "room_no is required"
                : "room_number must be number",
        })
            .positive("number should be positive"),
        teacher: zod_1.default
            .string({
            error: (issue) => issue.input === undefined
                ? "teacher is required"
                : "teacher must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "Invalid teacher Id"),
    }),
});
exports.updateClassSchema = zod_1.default.object({
    body: zod_1.default.object({
        classname: zod_1.default
            .string({
            error: "class name must be string",
        })
            .optional(),
        room_no: zod_1.default.coerce
            .number({
            error: "room_no must be number",
        })
            .positive()
            .optional(),
        section: zod_1.default
            .string({
            error: "section must be string",
        })
            .optional(),
        teacherId: zod_1.default
            .string({
            error: "teacher is must be string",
        })
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id")
            .optional(),
    }),
});
exports.deleteClassSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.getByIdClassSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default
            .string()
            .refine((id) => mongoose_1.default.Types.ObjectId.isValid(id), "invalid id"),
    }),
});
exports.classSchema = zod_1.default.object({
    query: zod_1.default.object({
        query: zod_1.default.string().optional(),
        order: zod_1.default.enum(["DESC", "ASC"]).default("DESC"),
        sortBy: zod_1.default.string().default("createdAt"),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(10),
        page: zod_1.default.coerce.number().int().min(1).default(1),
    }),
});
