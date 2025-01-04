import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params?.id;
  if (id) {
    try {
      const data = await MySQL.select()
        .from(contact)
        .where(eq(contact.id, Number(id)));
      if (data.length !== 0 && data[0]) {
        return data[0];
      }
    } catch {}
  }
  return null;
});
