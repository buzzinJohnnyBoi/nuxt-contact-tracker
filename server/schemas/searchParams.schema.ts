import { z } from "zod";

export const searchParamsSchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Page must be a valid number",
    })
    .transform((val) => Number(val))
    .optional(),
});
