import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string(),
  email: z.string(),
  birthDate: z
    .string()
    .transform((str) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(str)) {
        throw new Error("Date must be in yyyy-mm-dd format");
      }
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return str;
    })
    .nullable()
    .optional(), // Make birthDate optional
  phone: z.string(),
  address: z.string(),
  note: z.string(),
});
