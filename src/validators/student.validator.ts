import mongoose, { mongo } from "mongoose";
import z, { optional, refine } from "zod";
import { Gender } from "../@types/enum.types";

export const createStudentSchema = z.object({
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

    rollno: z.coerce
      .number({
        error: "roll no must be number",
      })
      .int("rollno should be integer")
      .positive("rollnumber should be positive")
      .optional(),

    class: z
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
      .min(3, "parent name atleast 3 character")
      .max(10, "parent name shouldnot exceeds than 100 characters"),

    parentPhone: z
      .string({
        error: "parent name must be string",
      })
      .regex(/^\d{10}$/, "phone number should be exact 10")
      .optional(),
  }),
});

export const updateStudent = z.object({
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

    rollno: z.coerce
      .number({
        error: "rollno must be number",
      })
      .int("rollno must be an integer")
      .positive("rollno must be greater than 0")
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
