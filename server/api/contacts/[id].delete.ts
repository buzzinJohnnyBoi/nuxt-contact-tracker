import { contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params?.id;

  if (id) {
    try {
      await MySQL.delete(contact).where(eq(contact.id, Number(id)));
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
    message: "Unknown error",
    success: false,
  };
});
