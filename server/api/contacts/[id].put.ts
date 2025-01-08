import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { eq } from "drizzle-orm";
import { contactSchema } from "~/server/schemas/contact.schema";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params?.id;

  if (id) {
    try {
      const body = await readBody(event);
      const existingContact = contactSchema.parse(body);
      await MySQL.update(contact)
        .set(existingContact)
        .where(eq(contact.id, Number(id)));

      return {
        message: "Contact updated successfully",
        success: true,
        data: body,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          success: false,
        };
      }
    }
  }
  return {
    message: "Unkwown error",
    success: false,
  };
});
