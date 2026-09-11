import z, { input } from "zod";

export const createStudentSchema = z.object({
  body: z.object({
    name: z
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

    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "email is reauired" : "Invalid credintals",
    }),
    password: z.string({
      error: (issue) =>
        issue.input === null ? "password is required" : "Invalid credintals",
    }),

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
  }),
});
