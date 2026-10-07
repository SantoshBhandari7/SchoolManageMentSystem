import mongoose, { mongo } from "mongoose";
import z, { optional, refine } from "zod";
import { Gender } from "../@types/enum.types";

export const createStudentSchema = z.object({
  body: z.object({
    // user:z
    //   .string({
    //     error: (issue) =>
    //       issue.input === null ? "user is required" : "user must be string",
    //   })
    //   .refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid user id"),
    name: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "fullname is required"
            : "fullname must be string",
      })
      .min(3, "full_name must be 3 character long")
      .max(100, "full_name must not exceed that 100 character"),

    password: z.string({
      error: (issue) =>
        issue.input === null
          ? "password is required"
          : "password must be string",
    }),
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "email is required"
          : "Invalid email format",
    }),

    gender: z.enum(Gender, {
      error: (issue) => {
        return issue.input === undefined
          ? "Gender is required"
          : "Gender must be valid";
      },
    }),

    address: z.string({
      error: (issue) =>
        issue.input === null ? "address is required" : "address must be string",
    }),

    roll_no: z.coerce
      .number({
        error: (issue) =>
          issue.input === null
            ? "roll_no is required"
            : "roll_no must be number",
      })
      .int("roll_no should be integer")
      .positive("roll_n0 should be positive"),

    classId: z
      .string({
        error: (issue) =>
          issue.input === null ? "class is required" : "class must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid class id"),

    parentName: z
      .string({
        error: (issue) =>
          issue.input === null
            ? "parentName is required"
            : "parentName must be string",
      })
      .min(3, "parent name at least 3 character")
      .max(10, "parent name should not exceeds than 100 characters"),

    parentPhone: z
      .string({
        error: "parent name must be string",
      })
      .regex(/^\d{10}$/, "phone number should be exact 10")
      .optional(),

    // file: z
    //   .object({
    //     fieldname: z.string(),
    //     originalname: z.string(),
    //     encoding: z.string(),
    //     mimetype: z.string(),
    //     size: z.number(),
    //   })
    //   .refine(
    //     (file) => file.fieldname === "profile_image",
    //     "Profile image is required",
    //   ),
  }),
});

export const updateStudentSchema = z.object({
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

    roll_no: z.coerce
      .number({
        error: "rollno must be number",
      })
      .int("roll_no must be an integer")
      .positive("roll_no must be greater than 0")
      .optional(),

    parentPhone: z
      .string({
        error: "parentPhone must be string",
      })
      .regex(/^9\d{9}$/, "parentPhone must contain exactly 10 digits")
      .optional(),
  }),

  params: z.object({
    userId: z
      .string({
        error: "userId must be string",
      })
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid user id"),
  }),
});

export const deleteStudentSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const getByIdStudentSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((id) => mongoose.Types.ObjectId.isValid(id), "invalid id"),
  }),
});

export const studentSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    order: z.enum(["DESC", "ASC"]).default("DESC"),
    sortBy: z.string().default("createdAt"),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1),
  }),
});
