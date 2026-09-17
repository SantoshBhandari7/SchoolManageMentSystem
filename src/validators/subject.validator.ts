import mongoose, { mongo } from "mongoose";
import z from "zod";

export const createSubjectSchema = z.object({
  body: z.object({
    subjectname: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "subjectname is required "
            : "subjectname must be string",
      })
      .min(4, "subjectname atleast 4 character long")
      .max(100, "subjectname should not be exceed than 100 character long"),

    credithour: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "credit our is required"
            : "credit hour must be number",
      })
      .int("number should be in interger")
      .positive("credit our must be greater than 0"),

    teacherId: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "teacher is required"
            : "teacher id must be in string",
      })
      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        "teacher id is invalid",
      ),

    classId: z
      .string({
        error: "classId must be string",
      })

      .refine(
        (id) => mongoose.Types.ObjectId.isValid(id),
        "class id is invalid",
      )
      .optional(),
  }),
});

export const updateSubjectSchema = z.object({
  body: z.object({
    subjectname: z
      .string({
        error: "subject name must be string",
      })
      .min(4, "subject name should be atleast 4 character long")
      .max(100, "subjectname should not be exceed than 100 character long")
      .optional(),

    classId: z
      .string({
        error: "classid must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid class id")
      .optional(),

    teacherId: z
      .string({
        error: "teacherid must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid classid")
      .optional(),

    crefithour: z.coerce
      .number({
        error: "credit must be number",
      })
      .positive("credit must be greater than 0")
      .int()
      .optional(),
  }),
});

export const deleteSubjectSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: "id should be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getSubjectByIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: "id must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const subjectSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1),
  }),
});
