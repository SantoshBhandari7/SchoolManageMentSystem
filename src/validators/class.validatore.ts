import mongoose from "mongoose";
import z, { input } from "zod";

export const createClassSchema = z.object({
  body: z.object({
    classname: z
      .string({
        error: (issue) => {
          issue.input === null
            ? "full name is required"
            : "full name must be string";
        },
      })
      .min(3, "name must be 2 character long")
      .max(100, "name should not exceeds 100 characters long")
      .trim(),

    section: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "section is reauired"
          : "section must be string",
    }),
    room_no: z.coerce
      .number({
        error: (issue) =>
          issue.input === null ? "password is required" : "Invalid credintals",
      })
      .positive("number should be positive"),

    teacher: z
      .string({
        error: "teacher must be string",
      })
      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        "teacher is isnot found",
      ),
  }),
});

export const updateClassSchema = z.object({
  body: z.object({
    classname: z
      .string({
        error: "class name must be string",
      })
      .optional(),

    room_no: z.coerce
      .number({
        error: "room_no must be number",
      })
      .positive()
      .optional(),

    section: z
      .string({
        error: "section must be string",
      })
      .optional(),

    teacher: z
      .string({
        error: "teacher is must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const deleteClassSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdClassSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const classSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page:z.coerce.number().int().min(1).default(1),
  }),
});
