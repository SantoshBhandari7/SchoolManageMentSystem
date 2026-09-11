import { email, input, z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
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
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});
export const loginSchema = z.object({
  body: z.object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "email is required" : "Invalid Credintals ",
    }),
    password: z.string({
      error: (issue) =>
        issue.input === null ? "password is required" : "Invalid Credintial",
    }),
  }),
});
