import { NewContact, contact } from "~/server/db/schema";
import MySQL from "~/server/db/connection";
import { eq } from "drizzle-orm";
import z from "zod";

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params?.id;

  if (id) {
    try {
      const body: NewContact = await readBody(event);
      body.birthDate = new Date(body.birthDate || "");
      await MySQL.update(contact)
        .set(body)
        .where(eq(contact.id, Number(id)));

      return {
        message: "Contact created successfully",
        data: body,
      };
    } catch {}
  }
  return null;
});
