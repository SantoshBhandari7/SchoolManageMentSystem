import { z } from "zod";
import mongoose from "mongoose";

const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid Program ID",
  });

export const createProgramSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Program name must be at least 2 characters")
      .max(100, "Program name must not exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must not exceed 500 characters")
      .optional(),

    duration: z
      .string()
      .min(1, "Duration must be at least 1 year")
      .max(10, "Duration cannot exceed 10 years"),

    eligibility: z
      .string()
      .trim()
      .min(2, "Eligibility must be at least 2 characters")
      .max(300, "Eligibility must not exceed 300 characters")
      .optional(),
  }),
});
export const getProgramsSchema = z.object({
  query: z.object({}).optional(),
});

export const getProgramByIdSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const updateProgramSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),

  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Program name must be at least 2 characters")
        .max(100, "Program name must not exceed 100 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must not exceed 500 characters")
        .optional(),

      duration: z
        .string()
        .min(1, "Duration must be at least 1 year")
        .max(10, "Duration cannot exceed 10 years")
        .optional(),

      eligibility: z
        .string()
        .trim()
        .min(2, "Eligibility must be at least 2 characters")
        .max(300, "Eligibility must not exceed 300 characters")
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field is required for update",
    }),
});

export const deleteProgramSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
