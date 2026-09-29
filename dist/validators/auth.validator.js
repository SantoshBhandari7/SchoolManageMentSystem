"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            error: (issue) => issue.input === null
                ? "fullname is required"
                : "fullname must be string",
        })
            .min(3, "full_name must be 3 character long")
            .max(100, "full_name must not exceed that 100 character"),
        password: zod_1.z.string({
            error: (issue) => issue.input === null
                ? "password is required"
                : "password must be string",
        }),
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "Invalid email format",
        }),
    }),
    params: zod_1.z.object({}).default({}),
    query: zod_1.z.object({}).default({}),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined ? "email is required" : "Invalid Credintals ",
        }),
        password: zod_1.z.string({
            error: (issue) => issue.input === null ? "password is required" : "Invalid Credintial",
        }),
    }),
});
