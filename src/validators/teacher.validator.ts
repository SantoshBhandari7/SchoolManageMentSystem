import mongoose, { mongo } from "mongoose";
import z, { optional, refine } from "zod";
import { Gender } from "../@types/enum.types";

export const createTeacherSchema = z.object({
  body: z.object({
    user: z
      .string({
        error: (issue) =>
          issue.input === null ? "user is required" : "user must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid user id"),

    gender: z.enum(Gender, { error: "gender must be valid" }).optional(),

    address: z
      .string({
        error: "address must be string",
      })
      .optional(),

    subject: z.string({
      error: "subject must be string",
    }),
    salary: z.coerce
      .number({
        error: "salary must be in number",
      })
      .positive("salary must be positive"),
    experiane: z.coerce.number({
      error: "experiance must be number",
    }),

    phone: z
      .string({
        error: "parent name must be string",
      })
      .regex(/^\d{10}$/, "phone number should be exact 10")
      .optional(),
  }),
});

export const updateTeacherSchema = z.object({
  body: z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === null
            ? "email must be string"
            : "invalid email format",
      })
      .optional(),
    password: z
      .string({
        error: "password must be string",
      })
      .optional(),

    address: z
      .string({
        error: "address must be string",
      })
      .trim()
      .optional(),

    salary: z.coerce
      .number({
        error: "salary must be number",
      })
      .positive("salary must be positive")
      .optional(),

    phone: z
      .string({
        error: "parentPhone must be string",
      })
      .regex(/^9\d{9}$/, "parentPhone must contain exactly 10 digits")
      .optional(),
  }),

  salary: z.coerce
    .number({
      error: "salary must be number",
    })
    .positive("salary must be positive")
    .optional(),

  experiance: z.coerce
    .number({
      error: "experiance should be number",
    })
    .positive("experiance must be positive")
    .optional(),

  params: z.object({
    userId: z
      .string({
        error: "userId must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid user id"),
  }),
});

export const deleteTeacherSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdTeacherSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const teacherSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1),
  }),
});
