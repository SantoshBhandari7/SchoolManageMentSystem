import z from "zod";

export const createStudentSchema = z.object({
  body: z.object({
    user: z
      .string({
        error: "user must be string",
      })
      .regex(),
  }),
});
